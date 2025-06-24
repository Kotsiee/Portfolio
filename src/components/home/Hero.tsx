// components/home/Hero.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import TextPlugin from 'gsap/TextPlugin';
import ScrambleTextPlugin from 'gsap/ScrambleTextPlugin';
import styles from '@/styles/hero.module.css';

gsap.registerPlugin(TextPlugin, ScrambleTextPlugin);

export default function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!nameRef.current || !titleRef.current) return;

    const tl = gsap.timeline();
    const textTl = gsap.timeline({ repeat: -1 });

    tl.to(nameRef.current, {
      duration: 1,
      scrambleText: {
        text: 'AHMED KOTWAL',
        chars: '+-#@*',
        revealDelay: 0.5,
        speed: 0.8,
      },
    }).fromTo(titleRef.current, { opacity: 0, y: -100 }, { duration: 1, opacity: 1, y: 0 });

    textTl
      .to(titleRef.current, {
        delay: 2.5,
        duration: 1,
        scrambleText: {
          text: ' - ',
          chars: '10IO|/-+',
          revealDelay: 0.5,
          speed: 0.8,
        },
      })
      .to(titleRef.current, {
        duration: 1,
        scrambleText: {
          text: 'UI / UX DESIGNER',
          chars: '10IO|/-+',
          revealDelay: 0.5,
          speed: 0.8,
        },
      })
      .to(titleRef.current, {
        delay: 2.5,
        duration: 1,
        scrambleText: {
          text: ' - ',
          chars: '10IO|/-+',
          revealDelay: 0.5,
          speed: 0.8,
        },
      })
      .to(titleRef.current, {
        duration: 1,
        scrambleText: {
          text: 'Software Engineer',
          chars: '10IO|/-+',
          revealDelay: 0.5,
          speed: 0.8,
        },
      });
  }, []);

  return (
    <section className={styles.hero} aria-labelledby="intro-heading">
      <div className={styles.introContainer}>
        <h1 ref={nameRef} className={styles.name} id="intro-heading">
          AK
        </h1>
        <h2 ref={titleRef} className={styles.title}>
          Software Engineer
        </h2>
      </div>
    </section>
  );
}
