import { useEffect, useRef } from 'react';

import { cn } from '@/utils/cn';

interface HeartWaveLoaderProps {
  label: string;
  className?: string;
}

const PARTICLE_COUNT = 104;
const PARTICLE_INDICES = Array.from({ length: PARTICLE_COUNT }, (_, index) => index);
const DURATION_MS = 8_400;
const PULSE_DURATION_MS = 5_600;
const TRAIL_SPAN = 0.18;
const ROOT = 3.3;
const AMPLITUDE = 0.9;
const WAVE_FREQUENCY = 6.4;

function normalizeProgress(progress: number) {
  return ((progress % 1) + 1) % 1;
}

function getPoint(progress: number, detailScale: number) {
  const xLimit = Math.sqrt(ROOT);
  const x = -xLimit + progress * xLimit * 2;
  const safeRoot = Math.max(0, ROOT - x * x);
  const wave = AMPLITUDE * Math.sqrt(safeRoot) * Math.sin(WAVE_FREQUENCY * Math.PI * x);
  const curve = Math.abs(x) ** (2 / 3);

  return {
    x: 50 + x * 23.2,
    y: 18 + (1.75 - (curve + wave)) * (24.5 + detailScale * 1.5),
  };
}

function buildPath(detailScale: number) {
  const steps = 240;
  return Array.from({ length: steps + 1 }, (_, index) => {
    const point = getPoint(index / steps, detailScale);
    return `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
  }).join(' ');
}

export function HeartWaveLoader({ label, className }: HeartWaveLoaderProps) {
  const groupRef = useRef<SVGGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const particleRefs = useRef<Array<SVGCircleElement | null>>([]);

  useEffect(() => {
    const group = groupRef.current;
    const path = pathRef.current;
    if (!group || !path) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const startedAt = performance.now();
    let animationFrame = 0;

    const render = (now: number) => {
      const time = now - startedAt;
      const progress = reducedMotion ? 0.72 : (time % DURATION_MS) / DURATION_MS;
      const pulseProgress = reducedMotion ? 0 : (time % PULSE_DURATION_MS) / PULSE_DURATION_MS;
      const detailScale = reducedMotion
        ? 0.76
        : 0.52 + ((Math.sin(pulseProgress * Math.PI * 2 + 0.55) + 1) / 2) * 0.48;

      path.setAttribute('d', buildPath(detailScale));

      particleRefs.current.forEach((particleNode, index) => {
        if (!particleNode) return;
        const tailOffset = index / (PARTICLE_COUNT - 1);
        const point = getPoint(normalizeProgress(progress - tailOffset * TRAIL_SPAN), detailScale);
        const fade = (1 - tailOffset) ** 0.56;
        particleNode.setAttribute('cx', point.x.toFixed(2));
        particleNode.setAttribute('cy', point.y.toFixed(2));
        particleNode.setAttribute('r', (0.9 + fade * 2.7).toFixed(2));
        particleNode.setAttribute('opacity', (0.04 + fade * 0.96).toFixed(3));
      });

      if (!reducedMotion) animationFrame = requestAnimationFrame(render);
    };

    animationFrame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      role="status"
      aria-label={label}
      className={cn('shrink-0 overflow-visible', className)}
    >
      <g ref={groupRef}>
        <path
          ref={pathRef}
          stroke="currentColor"
          strokeWidth="3.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.1"
        />
        {PARTICLE_INDICES.map((index) => (
          <circle
            key={index}
            ref={(node) => {
              particleRefs.current[index] = node;
            }}
            fill="currentColor"
          />
        ))}
      </g>
    </svg>
  );
}
