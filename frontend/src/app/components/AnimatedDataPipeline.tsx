"use client";

import { useEffect, useRef } from "react";

type Particle = {
  seed: number;
  row: number;
  column: number;
  speed: number;
  size: number;
  color: string;
};

const COLORS = ["#22d3ee", "#38bdf8", "#8b5cf6", "#d946ef", "#facc15"];

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const lerp = (from: number, to: number, amount: number) =>
  from + (to - from) * amount;

const ease = (value: number) =>
  value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;

const createParticles = (count: number): Particle[] =>
  Array.from({ length: count }, (_, index) => ({
    seed: (Math.sin(index * 62.41) + 1) * 0.5,
    row: index % 30,
    column: Math.floor(index / 30) % 34,
    speed: 0.72 + ((index * 19) % 29) * 0.018,
    size: 2.2 + (index % 4) * 0.9,
    color: COLORS[index % COLORS.length],
  }));

function square(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string,
  alpha: number,
  outline = false,
) {
  context.save();
  context.globalAlpha = alpha;
  context.shadowColor = color;
  context.shadowBlur = size * 3.6;
  if (outline) {
    context.strokeStyle = color;
    context.lineWidth = 1;
    context.strokeRect(x - size / 2, y - size / 2, size, size);
  } else {
    context.fillStyle = color;
    context.fillRect(x - size / 2, y - size / 2, size, size);
  }
  context.restore();
}

function glowLine(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  index: number,
  elapsed: number,
) {
  const y = height * (0.26 + index * 0.033);
  const phase = Math.sin(elapsed * 0.00045 + index * 0.8);
  const startX = width * (0.2 + phase * 0.018);
  const endX = width * 0.68;
  const color = index % 3 === 0 ? "#d946ef" : "#22d3ee";

  context.save();
  context.beginPath();
  context.moveTo(startX, y + phase * 18);
  context.bezierCurveTo(
    width * 0.35,
    y - height * (0.11 + index * 0.002),
    width * 0.47,
    y + height * (0.13 - index * 0.002),
    endX,
    y + Math.cos(elapsed * 0.0005 + index) * 8,
  );
  context.strokeStyle = color;
  context.globalAlpha = 0.1 + (index % 4) * 0.025;
  context.lineWidth = index % 5 === 0 ? 1.6 : 0.9;
  context.shadowColor = color;
  context.shadowBlur = 14;
  context.stroke();

  const pulse = (elapsed * 0.00018 + index * 0.07) % 1;
  const pulseX = lerp(startX, endX, pulse);
  const pulseY =
    y + Math.sin(pulse * Math.PI * 2 + index) * height * 0.075 + phase * 8;
  square(context, pulseX, pulseY, 3.2, color, 0.7);
  context.restore();
}

export default function AnimatedDataPipeline() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const smallScreen = window.matchMedia("(max-width: 768px)").matches;
    const lowPower =
      window.navigator.hardwareConcurrency <= 4 ||
      ((window.navigator as Navigator & { deviceMemory?: number })
        .deviceMemory ?? 8) <= 4;
    const particleCount = reducedMotion
      ? 95
      : smallScreen || lowPower
        ? 135
        : 245;
    const particles = createParticles(particleCount);
    const startTime = performance.now();
    let animationFrame = 0;
    let width = 1;
    let height = 1;
    let pixelRatio = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      pixelRatio = Math.min(window.devicePixelRatio || 1, lowPower ? 1.15 : 1.6);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const drawGrid = (
      originX: number,
      originY: number,
      columns: number,
      rows: number,
      cell: number,
      gap: number,
      alpha: number,
      elapsed: number,
    ) => {
      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const color = COLORS[(row * 5 + column * 3) % COLORS.length];
          const flicker = Math.sin(elapsed * 0.0011 + row * 0.7 + column) * 0.1;
          const outline = (row + column) % 4 === 0;
          square(
            context,
            originX + column * gap,
            originY + row * gap,
            cell,
            color,
            alpha + flicker,
            outline,
          );
        }
      }
    };

    const drawReflection = (elapsed: number) => {
      const baseY = height * 0.82;
      const reflection = context.createLinearGradient(0, baseY, 0, height);
      reflection.addColorStop(0, "rgba(34, 211, 238, 0.14)");
      reflection.addColorStop(0.42, "rgba(168, 85, 247, 0.09)");
      reflection.addColorStop(1, "rgba(5, 7, 13, 0)");
      context.fillStyle = reflection;
      context.fillRect(0, baseY, width, height - baseY);

      for (let index = 0; index < 42; index += 1) {
        const x = width * (0.28 + ((index * 31) % 59) / 90);
        const length = height * (0.04 + ((index * 7) % 15) / 120);
        const color = COLORS[index % COLORS.length];
        context.save();
        context.globalAlpha = 0.08 + Math.sin(elapsed * 0.001 + index) * 0.025;
        context.strokeStyle = color;
        context.shadowColor = color;
        context.shadowBlur = 20;
        context.beginPath();
        context.moveTo(x, baseY + 8);
        context.lineTo(x + Math.sin(index) * 6, baseY + length);
        context.stroke();
        context.restore();
      }
    };

    const draw = (time: number) => {
      const elapsed = reducedMotion ? 0 : time - startTime;
      context.clearRect(0, 0, width, height);

      const backdrop = context.createLinearGradient(0, 0, width, height);
      backdrop.addColorStop(0, "rgba(2, 6, 23, 0.8)");
      backdrop.addColorStop(0.52, "rgba(8, 15, 38, 0.54)");
      backdrop.addColorStop(1, "rgba(2, 6, 23, 0.9)");
      context.fillStyle = backdrop;
      context.fillRect(0, 0, width, height);

      context.save();
      context.globalCompositeOperation = "lighter";

      const centerCell = smallScreen ? 4.5 : 5.6;
      drawGrid(
        width * (smallScreen ? 0.43 : 0.47),
        height * 0.18,
        smallScreen ? 12 : 25,
        smallScreen ? 18 : 29,
        centerCell,
        centerCell * 2.05,
        0.12,
        elapsed,
      );

      const rightCell = smallScreen ? 4.8 : 6.4;
      drawGrid(
        width * (smallScreen ? 0.62 : 0.71),
        height * 0.14,
        smallScreen ? 13 : 25,
        smallScreen ? 20 : 31,
        rightCell,
        rightCell * 1.95,
        0.42,
        elapsed,
      );

      for (let index = 0; index < (smallScreen ? 9 : 18); index += 1) {
        glowLine(context, width, height, index, elapsed);
      }

      particles.forEach((particle, index) => {
        const progress =
          (particle.seed + elapsed * 0.000035 * particle.speed) % 1;
        const drift =
          Math.sin(elapsed * 0.0012 + index * 1.7) * height * 0.028;
        const chaosX =
          width * (0.08 + particle.seed * (smallScreen ? 0.25 : 0.31));
        const chaosY =
          height *
            (0.11 +
              ((Math.sin(index * 3.1) + 1) * 0.28 +
                ((index * 13) % 19) / 72)) +
          drift;
        const gridRow = particle.row % (smallScreen ? 19 : 30);
        const gridColumn = particle.column % (smallScreen ? 17 : 32);
        const cell = smallScreen ? 4.8 : 6;
        const centerX = width * (smallScreen ? 0.43 : 0.47) + gridColumn * cell * 2;
        const centerY = height * 0.17 + gridRow * cell * 1.92;
        const finalX = width * (smallScreen ? 0.63 : 0.71) + gridColumn * cell * 1.9;
        const finalY = height * 0.14 + gridRow * cell * 1.9;
        const travelX = lerp(chaosX, width * 0.9, progress);
        const align = ease(clamp((progress - 0.26) / 0.34, 0, 1));
        const settle = ease(clamp((progress - 0.58) / 0.27, 0, 1));
        const x = lerp(lerp(travelX, centerX, align), finalX, settle);
        const y = lerp(lerp(chaosY, centerY, align), finalY, settle);
        const fadeIn = clamp(progress / 0.1, 0, 1);
        const fadeOut = clamp((1 - progress) / 0.08, 0, 1);
        const alpha = Math.min(fadeIn, fadeOut, 0.9);
        const outline = progress < 0.23 && index % 3 === 0;

        square(
          context,
          x,
          y,
          particle.size,
          particle.color,
          alpha * (settle > 0.7 ? 0.52 : 0.9),
          outline,
        );
      });

      drawReflection(elapsed);
      context.restore();

      const vignette = context.createRadialGradient(
        width * 0.58,
        height * 0.36,
        width * 0.08,
        width * 0.58,
        height * 0.42,
        width * 0.75,
      );
      vignette.addColorStop(0, "rgba(5, 7, 13, 0)");
      vignette.addColorStop(0.72, "rgba(5, 7, 13, 0.16)");
      vignette.addColorStop(1, "rgba(5, 7, 13, 0.86)");
      context.fillStyle = vignette;
      context.fillRect(0, 0, width, height);

      if (!reducedMotion) {
        animationFrame = requestAnimationFrame(draw);
      }
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    animationFrame = requestAnimationFrame(draw);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-95"
    />
  );
}
