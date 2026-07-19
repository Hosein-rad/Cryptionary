"use client";

import { useEffect, useRef, useCallback } from "react";

// -------------------------------------------------------------------
// StarBackground – canvas starfield with randomized star colours.
// -------------------------------------------------------------------
export function StarBackground({ className = "" }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const starsRef = useRef([]);
  const dimsRef = useRef({ w: 0, h: 0 });

  // ---- configuration ----
  const LAYERS = [
    { count: 100, size: 1, speedBase: 0.25 },
    { count: 70, size: 2, speedBase: 0.5 },
    { count: 50, size: 3, speedBase: 0.8 },
  ];
  const BG_COLORS = ["#0b111e", "#1b2735"];

  // ---- random colour for each star (soft, warm/cool) ----
  const randomStarColor = useCallback(() => {
    const r = 100 + Math.floor(Math.random() * 76);
    const g = 100 + Math.floor(Math.random() * 76);
    const b = 100 + Math.floor(Math.random() * 56);
    return `rgb(${r}, ${g}, ${b})`;
  }, []);

  // ---- generate stars with colours ----
  const generateStars = useCallback(
    (w, h) => {
      const all = [];
      for (const layer of LAYERS) {
        for (let i = 0; i < layer.count; i++) {
          all.push({
            x: Math.random() * w,
            y: Math.random() * h,
            size: layer.size + (Math.random() - 0.6) * 0.5,
            speed: layer.speedBase * (0.6 + Math.random() * 0.5),
            opacity: 0.4 + Math.random() * 0.6,
            twinkleSpeed: 0.008 + Math.random() * 0.025,
            twinklePhase: Math.random() * Math.PI * 2,
            color: randomStarColor(), // stored once
          });
        }
      }
      // shuffle for variety
      for (let i = all.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [all[i], all[j]] = [all[j], all[i]];
      }
      return all;
    },
    [randomStarColor]
  );

  // ---- draw the scene ----
  const draw = useCallback((ctx, w, h, stars, time) => {
    // background gradient
    const grad = ctx.createRadialGradient(
      w * 0.5,
      h * 0.7,
      0,
      w * 0.5,
      h * 0.7,
      Math.max(w, h) * 0.8
    );
    grad.addColorStop(0, BG_COLORS[0]);
    grad.addColorStop(1, BG_COLORS[1]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // draw stars
    for (const star of stars) {
      // move downward
      star.y += star.speed;
      if (star.y > h) {
        star.y = 0;
        star.x = Math.random() * w;
      }

      // twinkle
      const twinkle =
        0.6 + 0.4 * Math.sin(time * star.twinkleSpeed + star.twinklePhase);
      const alpha = star.opacity * twinkle;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = star.color; // use stored colour
      ctx.globalAlpha = alpha;
      ctx.fill();

      // subtle glow for larger stars
      if (star.size > 2) {
        ctx.shadowColor = star.color;
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
    ctx.globalAlpha = 1; // reset
  }, []);

  // ---- animation loop ----
  const animate = useCallback(
    (timestamp) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      const { w, h } = dimsRef.current;
      if (!w || !h) return;

      draw(ctx, w, h, starsRef.current, timestamp);

      animationRef.current = requestAnimationFrame(animate);
    },
    [draw]
  );

  // ---- resize handler ----
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.parentElement?.getBoundingClientRect?.() ?? {
      width: 0,
      height: 0,
    };
    const dpr = window.devicePixelRatio || 1;
    const w = rect.width || window.innerWidth;
    const h = rect.height || window.innerHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    dimsRef.current = { w, h };
    starsRef.current = generateStars(w, h);
  }, [generateStars]);

  // ---- setup / teardown ----
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    handleResize();
    animate(0);

    const ro = new ResizeObserver(() => handleResize());
    if (canvas.parentElement) {
      ro.observe(canvas.parentElement);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [animate, handleResize]);

  return (
    <div className={`fixed inset-0 w-full h-full overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
}

export default StarBackground;
