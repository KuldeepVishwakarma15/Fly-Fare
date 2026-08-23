import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  magneticStrength?: number; // 0.1 to 0.35, max 3-6px movement
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Magnetic Button:
 * Moves subtly towards the mouse cursor (max 3-6px) on hover,
 * with smooth spring return on mouse leave.
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  magneticStrength = 0.25,
  onClick,
  disabled,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Constrain maximum translation to 5px
    const maxMove = 5;
    const moveX = Math.max(-maxMove, Math.min(maxMove, distanceX * magneticStrength));
    const moveY = Math.max(-maxMove, Math.min(maxMove, distanceY * magneticStrength));

    setPosition({ x: moveX, y: moveY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 25, mass: 0.5 }}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.97 }}
      className={`relative inline-flex items-center justify-center transition-shadow cursor-pointer select-none active:outline-none focus:outline-none ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
