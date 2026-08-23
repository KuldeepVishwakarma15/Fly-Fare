import React, { useEffect, useState, useRef } from 'react';

/**
 * Premium custom mouse cursor for desktop users.
 * Features:
 * - Ultra-responsive small dot + smooth spring-delayed outer ring
 * - Expands & brightens on hovering over interactive elements
 * - Ambient radial spotlight glow on the dashboard
 * - Automatically disabled on touch / mobile devices and prefers-reduced-motion
 */
export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Position state with lerp for silky smooth tracking
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Check if touch device or prefers-reduced-motion
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${e.clientX - 300}px, ${e.clientY - 300}px, 0)`;
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Detect hovering on interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = Boolean(
        target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('select') ||
          target.closest('[role="button"]') ||
          target.closest('.cursor-pointer') ||
          target.closest('.interactive-target')
      );

      setIsHoveringInteractive(isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    // Smooth lerp loop for the outer cursor ring
    const render = () => {
      const ease = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* 1. Subtle Ambient Spotlight Glow (Desktop Only, very low opacity) */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-[600px] h-[600px] pointer-events-none z-30 opacity-40 dark:opacity-30 mix-blend-soft-light transition-opacity duration-500 will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(99, 102, 241, 0.05) 45%, transparent 70%)',
          transform: 'translate3d(-1000px, -1000px, 0)'
        }}
      />

      {/* 2. Fast Center Cursor Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full pointer-events-none z-[9999] transition-all duration-75 will-change-transform ${
          isHoveringInteractive
            ? 'bg-blue-400 scale-150 shadow-[0_0_8px_rgba(59,130,246,0.8)]'
            : 'bg-blue-600 dark:bg-blue-400 opacity-80'
        } ${isClicking ? 'scale-75' : ''}`}
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />

      {/* 3. Smooth Delayed Outer Tracking Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 -ml-4 -mt-4 w-8 h-8 rounded-full pointer-events-none z-[9998] border border-blue-500/40 dark:border-blue-400/40 transition-all duration-200 ease-out will-change-transform ${
          isHoveringInteractive
            ? 'scale-150 border-blue-500 bg-blue-500/10 dark:bg-blue-400/10 shadow-[0_0_12px_rgba(59,130,246,0.3)]'
            : isClicking
            ? 'scale-90 border-blue-600 bg-blue-600/20'
            : 'scale-100 opacity-60'
        }`}
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />
    </>
  );
};
