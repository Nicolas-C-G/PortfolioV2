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

const COLORS = ["#24f6ff", "#8b5cf6", "#ff2bd6", "#ffd43b", "#7dd3fc"];

const easeInOut = (value: number) =>
  value < 0.5 ? 2 * value * value : 1 - Math.pow(-2 * value + 2, 2) / 2;

const lerp = (from: number, to: number, amount: number) =>
  from + (to - from) * amount;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const createParticles = (count: number): Particle[] =>
  Array.from({ length: count }, (_, index) => ({
    seed: (Math.sin(index * 91.7) + 1) * 0.5,
    row: index % 24,
    column: Math.floor(index / 24) % 28,
    speed: 0.026 + ((index * 13) % 17) * 0.0014,
    size: 2 + (index % 4),
    color: COLORS[index % COLORS.length],
  }));

function drawParticle(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string,
  alpha: number,
  glow = true,
) {
  context.globalAlpha = alpha;
  context.fillStyle = color;
  if (glow) {
    context.shadowColor = color;
    context.shadowBlur = size * 2.5;
  }
  context.fillRect(x - size / 2, y - size / 2, size, size);
  context.shadowBlur = 0;
  context.globalAlpha = 1;
}

function drawFlowLine(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  offset: number,
  color: string,
  alpha: number,
) {
  const startX = width * 0.24;
  const endX = width * 0.58;
  const baseY = height * (0.35 + offset * 0.055);
  const drift = Math.sin(offset * 3.7) * height * 0.035;

  context.beginPath();
  context.moveTo(startX, baseY + drift);
  context.bezierCurveTo(
    width * 0.34,
    baseY - height * 0.13,
    width * 0.43,
    baseY + height * 0.15,
    endX,
    baseY + drift * 0.35,
  );
  context.strokeStyle = color;
  context.globalAlpha = alpha;
  context.lineWidth = 1;
  context.stroke();
  context.globalAlpha = 1;
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
    const lowPower =
      window.navigator.hardwareConcurrency <= 4 ||
      ((window.navigator as Navigator & { deviceMemory?: number })
        .deviceMemory ?? 8) <= 4;
    const smallScreen = window.matchMedia("(max-width: 768px)").matches;
    const particleCount = reducedMotion
      ? 70
      : smallScreen || lowPower
        ? 95
        : 170;
    const particles = createParticles(particleCount);
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    const startTime = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      pixelRatio = Math.min(window.devicePixelRatio || 1, lowPower ? 1.25 : 1.75);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const drawStaticGrid = (time: number) => {
      const columns = smallScreen ? 13 : 22;
      const rows = smallScreen ? 18 : 24;
      const cell = Math.min(width * 0.012, 8);
      const gap = cell * 1.75;
      const originX = width * (smallScreen ? 0.58 : 0.69);
      const originY = height * 0.16;

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const colorIndex = (row * 7 + column * 5) % COLORS.length;
          const pulse = 0.58 + Math.sin(time * 0.001 + row + column) * 0.12;
          drawParticle(
            context,
            originX + column * gap,
            originY + row * gap,
            cell,
            COLORS[colorIndex],
            pulse,
            column === 0 || row === 0,
          );
        }
      }
    };

    const drawCenterGridGuide = () => {
      const columns = smallScreen ? 10 : 18;
      const rows = smallScreen ? 16 : 22;
      const cell = Math.min(width * 0.01, 6);
      const gap = cell * 1.85;
      const originX = width * (smallScreen ? 0.38 : 0.48);
      const originY = height * 0.18;

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          if ((row + column) % 3 === 0) continue;
          context.strokeStyle = "#38bdf8";
          context.globalAlpha = 0.1;
          context.strokeRect(
            originX + column * gap - cell / 2,
            originY + row * gap - cell / 2,
            cell,
            cell,
          );
          context.globalAlpha = 1;
        }
      }
    };

    const draw = (time: number) => {
      const elapsed = reducedMotion ? 0 : time - startTime;
      context.clearRect(0, 0, width, height);

      const gradient = context.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "rgba(3, 7, 18, 0.78)");
      gradient.addColorStop(0.5, "rgba(8, 15, 32, 0.42)");
      gradient.addColorStop(1, "rgba(3, 7, 18, 0.82)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      context.fillStyle = "rgba(34, 211, 238, 0.05)";
      context.fillRect(width * 0.42, 0, width * 0.16, height);
      context.fillStyle = "rgba(139, 92, 246, 0.045)";
      context.fillRect(width * 0.66, 0, width * 0.24, height);

      drawCenterGridGuide();
      drawStaticGrid(elapsed);

      for (let index = 0; index < (smallScreen ? 7 : 12); index += 1) {
        const linePhase = ((elapsed * 0.00008 + index / 12) % 1) * 2 - 1;
        drawFlowLine(
          context,
          width,
          height,
          linePhase,
          index % 3 === 0 ? "#ff2bd6" : "#24f6ff",
          0.08 + (index % 4) * 0.025,
        );
      }

      particles.forEach((particle, index) => {
        const progress =
          (particle.seed + elapsed * 0.00008 * particle.speed * 34) % 1;
        const chaoticY =
          height *
          (0.14 +
            ((Math.sin(particle.seed * 18 + index * 0.37) + 1) * 0.34 +
              Math.sin(elapsed * 0.0013 + index) * 0.03));
        const gridRow = particle.row % (smallScreen ? 17 : 24);
        const gridColumn = particle.column % (smallScreen ? 16 : 28);
        const cell = smallScreen ? 6 : 7;
        const targetX = width * 0.48 + gridColumn * cell * 1.7;
        const targetY = height * 0.16 + gridRow * cell * 1.7;
        const finalX = width * 0.69 + gridColumn * cell * 1.72;
        const finalY = height * 0.16 + gridRow * cell * 1.72;
        const x = lerp(width * 0.08, width * 0.92, progress);
        const alignAmount = easeInOut(clamp((progress - 0.28) / 0.32, 0, 1));
        const settleAmount = easeInOut(clamp((progress - 0.58) / 0.3, 0, 1));
        const wave = Math.sin(elapsed * 0.002 + index * 0.9) * 18;
        const y = lerp(
          lerp(chaoticY + wave, targetY, alignAmount),
          finalY,
          settleAmount,
        );
        const alignedX = lerp(lerp(x, targetX, alignAmount), finalX, settleAmount);
        const alpha =
          progress < 0.12
            ? progress / 0.12
            : progress > 0.92
              ? (1 - progress) / 0.08
              : 0.72;

        drawParticle(
          context,
          alignedX,
          y,
          particle.size,
          particle.color,
          clamp(alpha, 0, 0.82),
        );
      });

      const vignette = context.createRadialGradient(
        width * 0.54,
        height * 0.45,
        width * 0.1,
        width * 0.54,
        height * 0.45,
        width * 0.76,
      );
      vignette.addColorStop(0, "rgba(3, 7, 18, 0)");
      vignette.addColorStop(1, "rgba(3, 7, 18, 0.82)");
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
      className="pointer-events-none absolute inset-0 h-full w-full opacity-80"
    />
  );
}
