'use client';

import { ButtonHTMLAttributes, Dispatch, SetStateAction, useRef, useState } from 'react';
import gsap from 'gsap';

const MenuToggle: React.FC<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    onswitch?: (isOpen: boolean) => void;
    openstate?: [boolean, Dispatch<SetStateAction<boolean>>];
  }
> = (props) => {
  const line1 = useRef<SVGPathElement>(null);
  const line2 = useRef<SVGPathElement>(null);
  const line3 = useRef<SVGPathElement>(null);

  const toggleMenu = () => {
    if (!line1.current || !line2.current || !line3.current) return;

    if (!props.openstate?.[0]) {
      // Animate to X
      gsap.to(line1.current, {
        duration: 0.3,
        attr: { d: 'M4 4L60 60' },
        ease: 'power2.inOut',
      });
      gsap.to(line2.current, {
        duration: 0.3,
        attr: { d: 'M32 32L32 32' },
        ease: 'power2.inOut',
      });
      gsap.to(line3.current, {
        duration: 0.3,
        attr: { d: 'M60 4L4 60' },
        ease: 'power2.inOut',
      });
    } else {
      // Animate back to burger
      gsap.to(line1.current, {
        duration: 0.3,
        attr: { d: 'M2 8L62 8' },
        ease: 'power2.inOut',
      });
      gsap.to(line2.current, {
        duration: 0.3,
        attr: { d: 'M2 34L62 34' },
        ease: 'power2.inOut',
      });
      gsap.to(line3.current, {
        duration: 0.3,
        attr: { d: 'M2 60L62 60' },
        ease: 'power2.inOut',
      });
    }

    props.openstate?.[1]((prev) => !prev);
    props.onswitch?.(props.openstate?.[0] || false);
  };

  return (
    <button
      onClick={toggleMenu}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
      }}
      aria-label="Toggle menu"
      className={`menubox ${props.className || ''}`}
    >
      <svg
        viewBox="0 0 64 64"
        width="40"
        height="40"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="square"
        fill="none"
      >
        <path ref={line1} d="M2 8L62 8" />
        <path ref={line2} d="M2 34L62 34" />
        <path ref={line3} d="M2 60L62 60" />

        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur1" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </button>
  );
};

export default MenuToggle;
