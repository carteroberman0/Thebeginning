"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const PROJECT_TYPES = ["Real Estate", "Event", "Commercial", "Landscape", "Other"];

const fieldStyle = {
  background: "var(--surface-2)",
  color: "var(--text)",
  border: "2px solid var(--text)",
};

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xdajwpkz", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="p-10 text-center border-2" style={{ borderColor: "var(--brand)", background: "var(--surface)" }}>
        <p className="text-3xl mb-3" style={{ color: "var(--brand)" }}>✓</p>
        <h3 className="font-black uppercase tracking-wide text-text mb-2">Message Sent!</h3>
        <p style={{ color: "var(--muted)" }}>We'll get back to you within 48 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field name="name" label="Name" type="text" required />
        <Field name="email" label="Email" type="email" required />
      </div>
      <Field name="phone" label="Phone (optional)" type="tel" />

      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-extrabold tracking-[0.25em] uppercase" style={{ color: "var(--text)" }}>
          Project Type
        </label>
        <select
          name="projectType"
          required
          className="px-4 py-3 text-sm outline-none"
          style={fieldStyle}
        >
          <option value="">Select a type…</option>
          {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-extrabold tracking-[0.25em] uppercase" style={{ color: "var(--text)" }}>
          Message
        </label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell us about your project, location, and timeline…"
          className="px-4 py-3 text-sm outline-none resize-none"
          style={fieldStyle}
        />
      </div>

      {status === "error" && (
        <p className="text-sm" style={{ color: "#c0392b" }}>
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn btn-green w-full"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

function Field({ name, label, type, required }: { name: string; label: string; type: string; required?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-extrabold tracking-[0.25em] uppercase" style={{ color: "var(--text)" }}>
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="px-4 py-3 text-sm outline-none"
        style={{
          background: "var(--surface-2)",
          color: "var(--text)",
          border: "2px solid var(--text)",
        }}
      />
    </div>
  );
}
