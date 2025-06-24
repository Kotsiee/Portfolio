'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function useImageHover() {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const moveImage = (e: MouseEvent) => {
      gsap.to(img, {
        duration: 0.8,
        x: e.clientX - img.offsetWidth / 2,
        y: e.clientY - img.offsetHeight / 2,
        ease: 'power2.out',
      });
    };

    document.addEventListener('mousemove', moveImage);
    return () => document.removeEventListener('mousemove', moveImage);
  }, []);

  const handleMouseEnter = (src: string) => {
    const img = imgRef.current;
    if (!img) return;

    if (img.src !== src) {
      img.style.opacity = '1';
      gsap.to(img, {
        scale: 0,
        duration: 0.2,
        onComplete: () => {
          img.src = src;
          gsap.to(img, { scale: 1, duration: 0.4 });
        },
      });
    } else {
      img.style.opacity = '1';
      gsap.to(img, { scale: 1, duration: 0.4 });
    }
  };

  const handleMouseLeave = () => {
    const img = imgRef.current;
    if (img) {
      img.style.opacity = '0';
      gsap.to(img, { scale: 0, duration: 0.4 });
    }
  };

  return { imgRef, handleMouseEnter, handleMouseLeave };
}
