import React, { useRef } from "react";
import {
  useScroll,
  useSpring,
  useTransform,
  motion,
  type MotionValue,
} from "framer-motion";

const SPRING = { stiffness: 110, damping: 22, mass: 0.5 } as const;

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const scaleDimensions = (): [number, number] => (isMobile ? [0.8, 0.95] : [1.05, 1]);

  // Spring-smoothed scroll so the device glides toward its target rather than
  // tracking the wheel 1:1 — a more fluid feel.
  const rotate = useSpring(
    useTransform(scrollYProgress, [0, 1], [24, 0]),
    SPRING,
  );
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 1], scaleDimensions()),
    SPRING,
  );
  const translate = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -90]),
    SPRING,
  );

  return (
    <div
      ref={containerRef}
      className="relative flex h-[58rem] items-center justify-center p-2 md:h-[72rem] md:p-12"
    >
      <div className="relative w-full py-10 md:py-28" style={{ perspective: "1100px" }}>
        <Header translate={translate} titleComponent={titleComponent} />
        <MacBook rotate={rotate} scale={scale}>
          {children}
        </MacBook>
      </div>
    </div>
  );
};

const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
}) => (
  <motion.div
    style={{ translateY: translate }}
    className="mx-auto max-w-5xl text-center"
  >
    {titleComponent}
  </motion.div>
);

/** A MacBook-shaped device whose lid + base tilt together as you scroll. */
const MacBook = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}) => (
  <motion.div
    style={{ rotateX: rotate, scale, transformOrigin: "center bottom" }}
    className="mx-auto mt-8 w-full max-w-5xl [transform-style:preserve-3d]"
  >
    {/* lid */}
    <div
      className="relative rounded-[22px] border border-white/10 p-2.5 shadow-2xl"
      style={{
        background:
          "linear-gradient(155deg,#4a4a50 0%,#26262b 38%,#17171b 70%,#33333a 100%)",
        boxShadow:
          "0 40px 90px -30px rgba(80,40,160,0.45), inset 0 1px 0 rgba(255,255,255,0.18)",
      }}
    >
      {/* camera notch */}
      <div className="absolute left-1/2 top-0 z-20 flex h-3 w-28 -translate-x-1/2 items-center justify-center rounded-b-lg bg-black">
        <span className="h-1 w-1 rounded-full bg-[#1c2330] ring-1 ring-white/10" />
      </div>
      <div className="h-[26rem] w-full overflow-hidden rounded-[12px] bg-[#0d0c16] ring-1 ring-white/5 md:h-[34rem]">
        {children}
      </div>
    </div>
    {/* base / keyboard deck */}
    <div className="relative mx-auto -mt-1 h-4 w-[104%] -translate-x-[2%] rounded-b-2xl bg-gradient-to-b from-[#43434a] via-[#26262b] to-[#101014] shadow-2xl">
      <div className="mx-auto h-1.5 w-28 rounded-b-lg bg-black/40" />
    </div>
  </motion.div>
);
