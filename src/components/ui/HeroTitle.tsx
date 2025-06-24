'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from './HeroTitle.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function HeroTitle({ text }: { text: string }) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    gsap.fromTo(
      titleRef.current,
      { y: 0, opacity: 1 },
      {
        ease: 'power2.out',
        duration: 1,
        opacity: 0,
        y: -800,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      },
    );
  }, []);

  return (
    <h1 className={styles.title} ref={titleRef}>
      {text}
    </h1>
  );
}
