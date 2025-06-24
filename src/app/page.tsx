'use client';
// app/page.tsx
import Navigation from '@/components/navigation/navigation';
import Hero from '@/components/home/Hero';
import Background from '@/components/r3f/background';
import styles from '@/styles/hero.module.css';

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
      </main>

      <div className={styles.canvas} style={{ pointerEvents: 'none' }} aria-hidden="true">
        <Background />
      </div>
    </>
  );
}
