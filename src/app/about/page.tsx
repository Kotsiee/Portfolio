'use client';

import PageWrapper from '@/components/layout/PageWrapper';
import HeroTitle from '@/components/ui/HeroTitle';
import AnimatedHeading from '@/components/ui/AnimatedHeading';
import LiveClock from '@/components/ui/LiveClock';
import AsideNav from '@/components/navigation/AsideNav';
import Ball from '@/components/r3f/ball';
import LeftChevron from '@/assets/SVG/leftChevron.svg';
import Email from '@/assets/SVG/Email.svg';
import Github from '@/assets/SVG/Github.svg';
import LinkedIn from '@/assets/SVG/LinkedIn.svg';

import styles from './page.module.css';
import sectionStyles from '@/components/ui/AboutSection.module.css';
import buttonStyles from '@/components/ui/AboutButton.module.css';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sections = [
  { id: 'who', label: 'Who Am I?' },
  { id: 'what', label: 'What Am I?' },
  { id: 'why', label: 'Why Am I?' },
  { id: 'where', label: 'Where Am I?' },
];

export default function AboutPage() {
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentWrapperRef.current || !asideRef.current) return;

    const aside = asideRef.current;
    const items = aside.querySelectorAll('li');

    gsap.set(aside, {
      opacity: 0,
      pointerEvents: 'none',
    });

    ScrollTrigger.create({
      trigger: contentWrapperRef.current,
      start: 'top center',
      onEnter: () => {
        gsap.to(aside, { opacity: 1, pointerEvents: 'auto', duration: 0.3 });
        gsap.from(items, {
          x: -50,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power2.out',
        });
      },
      onLeaveBack: () => gsap.to(aside, { opacity: 0, duration: 0.3 }),
    });

    const sections = gsap.utils.toArray<HTMLElement>('section');

    sections.forEach((section) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
      });

      tl.fromTo(section, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'none' }).to(section, {
        opacity: 0,
        duration: 0.5,
        ease: 'none',
      });
    });
  }, []);

  return (
    <PageWrapper>
      <main className={styles.scene}>
        <div className={styles.hero}>
          <div className={styles.introContainer}>
            <HeroTitle text="About Me" />
          </div>
        </div>

        <div className={styles.contentWrapper} ref={contentWrapperRef}>
          <div ref={asideRef}>
            <AsideNav items={sections} />
          </div>

          <article className={styles.content}>
            <AnimatedHeading targetSections={sections}>Who Am I?</AnimatedHeading>

            <section id="who" className={sectionStyles.section} data-section="Who">
              <p className={sectionStyles.info}>
                I’m a curious and driven computer science graduate, always learning and building. I
                love solving problems, making cool digital stuff, and working with people who care
                about what they’re doing. Outside of tech, I enjoy finding joy in the small things
                and staying grounded while keeping active at the gym.
              </p>
              <div className={sectionStyles.visual}>
                <img src="https://images.unsplash.com/photo-1534614971-6be99a7a3ffd?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              </div>
            </section>

            <section id="what" className={sectionStyles.section} data-section="What">
              <p className={sectionStyles.info}>
                Someone who codes, designs, and thinks across different layers of technology.
                <br />
                <br />
                A developer, problem-solver, and creative thinker. I’ve worked across web, app, and
                game development — from React dashboards to Unity mobile games. I'm comfortable
                navigating both design tools and databases, and I love working at the intersection
                of tech and people.
                <br />
                <br />
                My toolbox includes JavaScript, Python, Flutter, Firebase, and even some
                systems-level work in Rust and C++. I enjoy the whole spectrum—from backend
                databases to frontend animations.
              </p>
              <div className={sectionStyles.visual}>
                <Ball />
              </div>
            </section>

            <section id="why" className={sectionStyles.section} data-section="Why">
              <div className={sectionStyles.info}>
                Because I like solving real-world problems with code.
                <br />
                <br />
                Tech gives me the tools to make things better — whether that’s simplifying a
                workflow, building tools for creators, or connecting people with resources. I want
                to keep pushing myself, collaborating with sharp teams, and contributing to tech
                that actually helps.
                <div className={styles.viewProjects}>
                  <h2>VIEW PROJECTS</h2>
                  <button className={buttonStyles.aboutButton}>
                    <LeftChevron />
                  </button>
                </div>
              </div>
            </section>

            <section id="where" className={sectionStyles.section} data-section="Where">
              <div className={sectionStyles.info}>
                <p>
                  <strong>Location:</strong> Greater Manchester, UK, Europe, Earth (Usually)
                </p>
                <p>
                  <strong>Time:</strong> <LiveClock />
                </p>
                <hr />
                <div>
                  <Email className={styles.sociallink + ' ' + styles.email} />
                  <Github className={styles.sociallink + ' ' + styles.github} />
                  <LinkedIn className={styles.sociallink + ' ' + styles.linkedin} />
                </div>
              </div>
            </section>
          </article>
        </div>
      </main>
    </PageWrapper>
  );
}
