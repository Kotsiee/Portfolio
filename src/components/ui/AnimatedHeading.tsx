'use client';

import { useRef } from 'react';
import styles from './AnimatedHeading.module.css';
import useStickyHeading from '@/hooks/useStickyHeading';

export default function AnimatedHeading({
  children,
  targetSections = [],
}: {
  children: string;
  targetSections: { id: string; label: string }[];
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useStickyHeading(headingRef, targetSections);

  return (
    <h2 className={styles.animatedHeading} ref={headingRef}>
      {children}
    </h2>
  );
}
