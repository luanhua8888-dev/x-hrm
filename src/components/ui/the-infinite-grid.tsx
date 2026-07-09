import React, { useRef } from "react";
import { cn } from "@/utils/cn";
import { 
  motion, 
  useMotionValue, 
  useMotionTemplate, 
  useAnimationFrame,
  MotionValue
} from "framer-motion";

interface InfiniteGridBackgroundProps {
  children?: React.ReactNode;
}

export const Component = ({ children }: InfiniteGridBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = containerRef.current;
    if (!card) return;
    const { left, top } = card.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  const speedX = 0.4; 
  const speedY = 0.4;

  useAnimationFrame(() => {
    const currentX = gridOffsetX.get();
    const currentY = gridOffsetY.get();
    gridOffsetX.set((currentX + speedX) % 40);
    gridOffsetY.set((currentY + speedY) % 40);
  });

  const maskImage = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden animate-bg-shift bg-brand-bg px-4 py-4 sm:py-6"
      )}
    >
      {/* Background Scrolling Grid (Static 8% opacity) */}
      <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none">
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </div>

      {/* Mouse reveal glowing grid layer */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-[0.32] pointer-events-none"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </motion.div>

      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[650px] w-[650px] rounded-full bg-primary/20 blur-[130px] pointer-events-none animate-pulse-slow" />
        <div className="absolute -top-40 -left-40 h-[450px] w-[450px] rounded-full bg-secondary-teal/10 blur-[110px] pointer-events-none animate-drift" />
        <div className="absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-primary/10 blur-[110px] pointer-events-none animate-drift-reverse" />
      </div>

      {/* Render children (like the Login card) */}
      {children}
    </div>
  );
};

const GridPattern = ({ offsetX, offsetY }: { offsetX: MotionValue<number>; offsetY: MotionValue<number> }) => {
  return (
    <svg className="w-full h-full">
      <defs>
        <motion.pattern
          id="grid-pattern"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            className="text-white" 
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  );
};
