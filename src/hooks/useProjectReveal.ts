'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useProjectReveal() {
  useEffect(() => {
    gsap.utils.toArray<HTMLElement>('section').forEach((section) => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
          },
        })
        .fromTo(section, { opacity: 0 }, { opacity: 1, duration: 0.5 })
        .to(section, { opacity: 0, duration: 0.5 });
    });

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);
}
