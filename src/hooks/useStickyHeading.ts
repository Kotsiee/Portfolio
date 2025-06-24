// hooks/useStickyHeading.ts
'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useStickyHeading(
  headingRef: React.RefObject<HTMLElement>,
  sections: { id: string; label: string }[],
) {
  useEffect(() => {
    if (!headingRef.current) return;
    const heading = headingRef.current;

    // Pin the heading to the top
    ScrollTrigger.create({
      trigger: heading,
      start: 'top top+=100',
      end: () => `+=${document.querySelectorAll('section').length * window.innerHeight}`,
      pin: true,
      pinSpacing: false,
      scrub: true,
    });

    // Update text on scroll
    sections.forEach(({ id, label }) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'center bottom',
        end: 'bottom bottom',
        scrub: true,
        onEnter: () => {
          if (heading) heading.textContent = label;
        },
        onEnterBack: () => {
          if (heading) heading.textContent = label;
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [headingRef, sections]);
}
