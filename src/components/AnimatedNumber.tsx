import React, { useEffect, useState, useRef } from 'react';

interface AnimatedNumberProps {
  value: number;
  durationMs?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  formatIndianLocale?: boolean;
  className?: string;
}

/**
 * AnimatedNumber:
 * Smoothly counts up to the target number when in viewport using easeOutExpo.
 */
export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  durationMs = 900,
  decimals = 0,
  prefix = '',
  suffix = '',
  formatIndianLocale = true,
  className = ''
}) => {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            animateCount(value);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value]);

  // If value changes after initial animation, animate to new value
  useEffect(() => {
    if (hasAnimated.current) {
      animateCount(value);
    }
  }, [value]);

  const animateCount = (target: number) => {
    const start = displayValue;
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      // Ease out expo for snappy, high-precision feel
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = start + (target - start) * easeProgress;

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setDisplayValue(target);
      }
    };

    requestAnimationFrame(update);
  };

  const formatNumber = (num: number) => {
    const fixed = num.toFixed(decimals);
    if (!formatIndianLocale) return fixed;

    const parts = fixed.split('.');
    const intPart = parseInt(parts[0], 10);
    const formattedInt = isNaN(intPart) ? '0' : intPart.toLocaleString('en-IN');

    return parts.length > 1 ? `${formattedInt}.${parts[1]}` : formattedInt;
  };

  return (
    <span ref={elementRef} className={`tabular-nums ${className}`}>
      {prefix}
      {formatNumber(displayValue)}
      {suffix}
    </span>
  );
};
