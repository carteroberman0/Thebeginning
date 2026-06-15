import type { OptionCategory } from "@configurator/shared";
import { prisma } from "../db.js";
import { renderProvider } from "../render/index.js";

/**
 * A minimal in-memory job queue. Render jobs are created in the DB, their ids
 * pushed here, and a background worker processes them one at a time, storing
 * the resulting layer and flipping job/property status. The web app polls the
 * DB for progress. For production you'd swap this for BullMQ/Redis, but the
 * shape (enqueue -> process -> store asset -> update status) stays the same.
 */
class RenderQueue {
  private pending: string[] = [];
  private running = false;

  enqueue(jobIds: string[]): void {
    this.pending.push(...jobIds);
    void this.drain();
  }

  /** Re-pick jobs left unfinished (e.g. after a server restart). */
  async resume(): Promise<void> {
    const stuck = await prisma.renderJob.findMany({
      where: { status: { in: ["queued", "processing"] } },
      select: { id: true },
    });
    if (stuck.length) this.enqueue(stuck.map((j) => j.id));
  }

  private async drain(): Promise<void> {
    if (this.running) return;
    this.running = true;
    try {
      while (this.pending.length) {
        const id = this.pending.shift()!;
        await this.process(id);
      }
    } finally {
      this.running = false;
    }
  }

  private async process(jobId: string): Promise<void> {
    const job = await prisma.renderJob.findUnique({
      where: { id: jobId },
      include: { option: true, property: true },
    });
    if (!job) return;

    await prisma.renderJob.update({ where: { id: jobId }, data: { status: "processing" } });

    try {
      const result = await renderProvider.render({
        propertyId: job.propertyId,
        baseImageUrl: job.property.baseImageUrl,
        category: job.option.category as OptionCategory,
        value: job.option.value,
        label: job.option.label,
        swatchHex: job.option.swatchHex,
      });

      // Store the finished layer (one canonical asset per property+option).
      await prisma.renderAsset.upsert({
        where: { propertyId_optionId: { propertyId: job.propertyId, optionId: job.optionId } },
        create: { propertyId: job.propertyId, optionId: job.optionId, imageUrl: result.imageUrl },
        update: { imageUrl: result.imageUrl },
      });

      await prisma.renderJob.update({
        where: { id: jobId },
        data: { status: "done", error: null },
      });
    } catch (err) {
      await prisma.renderJob.update({
        where: { id: jobId },
        data: { status: "failed", error: err instanceof Error ? err.message : String(err) },
      });
    }

    await this.refreshPropertyStatus(job.propertyId);
  }

  private async refreshPropertyStatus(propertyId: string): Promise<void> {
    const jobs = await prisma.renderJob.findMany({
      where: { propertyId },
      select: { status: true },
    });
    const allDone = jobs.length > 0 && jobs.every((j) => j.status === "done" || j.status === "failed");
    await prisma.property.update({
      where: { id: propertyId },
      data: { status: allDone ? "ready" : "rendering" },
    });
  }
}

export const renderQueue = new RenderQueue();
