'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from './AsideNav.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function AsideNav({ items }: { items: { id: string; label: string }[] }) {
  const asideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const aside = asideRef.current;
    if (!aside) return;

    const setActiveLink = (id: string) => {
      const navLinks = aside.querySelectorAll(`.${styles.navLink}`);
      navLinks.forEach((link) => {
        const linkHref = (link as HTMLAnchorElement).getAttribute('href');
        if (linkHref === `#${id}`) {
          link.classList.add(styles.active);
          link.parentElement?.classList.add(styles.active); // for <li>
        } else {
          link.classList.remove(styles.active);
          link.parentElement?.classList.remove(styles.active);
        }
      });
    };

    // Initial setup
    gsap.set(aside, {
      position: 'fixed',
      top: '40vh',
      left: aside.getBoundingClientRect().left,
      opacity: 0,
    });

    // Animate in when entering viewport
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => {
        gsap.to(aside, { opacity: 1, duration: 0.8 });
        gsap.from(aside.querySelectorAll('li'), {
          x: -50,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power2.out',
        });
      },
      onLeaveBack: () => gsap.to(aside, { opacity: 0, duration: 0.3 }),
    });

    // Add active class to nav link matching current section
    items.forEach(({ id }) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          setActiveLink(id);
        },
        onEnterBack: () => {
          setActiveLink(id);
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, [items]);

  return (
    <aside className={styles.aside} ref={asideRef}>
      <nav>
        <ul className={styles.navList}>
          {items.map(({ id, label }) => (
            <li key={id} className={styles.navItem}>
              <a href={`#${id}`} className={styles.navLink}>
                {label}
              </a>
              <div className={styles.underline} />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
