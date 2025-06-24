// components/navigation/navigation.tsx
'use client';

import { useState, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import { TLink } from './TLink';
import MenuToggle from './menuToggle';
import nav from './navigation.module.css';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);

  const handleMenuToggle = (open: boolean) => {
    const menuItems = gsap.utils.toArray('.menuitem');

    if (!open) {
      // Opening menu
      menuRef.current!.style.pointerEvents = 'auto';
      gsap.fromTo(
        menuItems,
        { opacity: 0, y: -10 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.4,
          ease: 'power2.out',
        },
      );
    } else {
      // Closing menu
      gsap.to(menuItems, {
        opacity: 0,
        y: -10,
        stagger: 0.05,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          if (menuRef.current) {
            menuRef.current.style.pointerEvents = 'none';
          }
        },
      });
    }
  };

  return (
    <nav className={nav.nav} aria-label="Main navigation">
      <div className={nav.navleft} aria-label="Brand or logo">
        <Link href="/">Hey</Link>
      </div>

      <div className={nav.navright}>
        <ul className={nav.menuList} ref={menuRef} role="menu">
          <li className="menuitem" role="menuitem">
            <Link className={nav.link} href="/">
              Home
            </Link>
          </li>
          <li className="menuitem" role="menuitem">
            <TLink className={nav.link} href="/about">
              About
            </TLink>
          </li>
          <li className="menuitem" role="menuitem">
            <TLink className={nav.link} href="/projects">
              Projects
            </TLink>
          </li>
          <li className="menuitem" role="menuitem">
            <TLink className={nav.link} href="/contact">
              Contact
            </TLink>
          </li>
        </ul>

        <MenuToggle
          className={nav.menubox}
          onswitch={handleMenuToggle}
          openstate={[isOpen, setIsOpen]}
        />
      </div>
    </nav>
  );
}
