"use client";

import React, { useEffect, useRef } from "react";
import type { CanvasConfig } from "../lib/canvasConfig";

type Props = {
  className?: string;
  config?: CanvasConfig;
};

export default function AnimatedCanvas({ className, config }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    const dpr = window.devicePixelRatio || 1;

    function resize() {
      const c = canvasRef.current!;
      const rect = c.getBoundingClientRect();
      c.width = Math.max(1, Math.floor(rect.width * dpr));
      c.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const cfg = config;

    function draw(time: number) {
      resize();
      const c = canvasRef.current!;
      const w = c.width / dpr;
      const h = c.height / dpr;

      ctx.clearRect(0, 0, w, h);

      if (cfg?.background) {
        ctx.fillStyle = cfg.background;
        ctx.fillRect(0, 0, w, h);
      }

      if (cfg?.blobs) {
        cfg.blobs.forEach((b, i) => {
          b.x += b.vx * Math.cos(time * 0.0008 + i);
          b.y += b.vy * Math.sin(time * 0.0009 + i);

          const cx = b.x * w;
          const cy = b.y * h;
          const radius = b.r * Math.min(w, h);

          const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
          g.addColorStop(0, `hsla(${b.hue},85%,65%,0.95)`);
          g.addColorStop(0.35, `hsla(${(b.hue + 30) % 360},85%,60%,0.6)`);
          g.addColorStop(1, `hsla(${(b.hue + 60) % 360},85%,55%,0.12)`);

          ctx.globalCompositeOperation = "screen";
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [config]);

  return <canvas ref={canvasRef} className={className} />;
}
