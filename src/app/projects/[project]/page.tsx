'use client';

import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import HeroTitle from '@/components/ui/HeroTitle';
import AnimatedHeading from '@/components/ui/AnimatedHeading';
import AsideNav from '@/components/navigation/AsideNav';
import PageWrapper from '@/components/layout/PageWrapper';

import styles from './page.module.css'; // similar to about page styles
import sectionStyles from '@/components/ui/AboutSection.module.css';
import { use, useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'motivation', label: 'Motivation' },
  { id: 'process', label: 'Process' },
  { id: 'showcase', label: 'Showcase' },
  { id: 'features', label: 'Features' },
  { id: 'future', label: 'Future Work' },
];

export default function ProjectPage({ params }: { params: Promise<{ project: string }> }) {
  const { project } = use(params);

  const p = projects.find((p) => p.slug === project);
  if (!p) return notFound();

  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentWrapperRef.current || !asideRef.current) return;

    const aside = asideRef.current;
    const items = aside.querySelectorAll('li');

    gsap.set(aside, { opacity: 0, pointerEvents: 'none' });

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

      tl.fromTo(section, { opacity: 0 }, { opacity: 1, duration: 0.5 }).to(section, {
        opacity: 0,
        duration: 0.5,
      });
    });
  }, []);

  return (
    <PageWrapper>
      <main className={styles.scene}>
        <div className={styles.hero}>
          <div className={styles.introContainer}>
            <HeroTitle text={p.title} />
          </div>
        </div>

        <div className={styles.contentWrapper} ref={contentWrapperRef}>
          <div ref={asideRef}>
            <AsideNav items={sections} />
          </div>

          <article className={styles.content}>
            <AnimatedHeading targetSections={sections}>Overview</AnimatedHeading>

            <section id="overview" className={sectionStyles.section} data-section="Overview">
              <p
                className={sectionStyles.info}
                dangerouslySetInnerHTML={{ __html: p.overview }}
              />
              <div className={sectionStyles.visual}>
                <p>
                  <b>Tech Stack</b>
                  <br />
                  {p.techStack.join(', ')}
                </p>
              </div>
            </section>

            <section id="motivation" className={sectionStyles.section} data-section="Motivation">
              <p className={sectionStyles.info}>{p.motivation}</p>
            </section>

            <section id="process" className={sectionStyles.section} data-section="Process">
              <div className={sectionStyles.info}>
                {p.process.map((step, i) => (
                  <div key={i} style={{ marginBottom: '2rem' }}>
                    <p>
                      <b>{step.step}</b>
                    </p>
                    <p>{step.evidence}</p>
                    {step.image[0] && (
                      <div className={sectionStyles.visual}>
                        <img src={step.image[0]} alt={step.step} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section id="showcase" className={sectionStyles.section} data-section="Showcase">
              <div className={sectionStyles.visual} style={{ flexWrap: 'wrap', gap: '2rem' }}>
                {p.showcase.map((item: { image: string; link: string }, i: number) => (
                  <a key={i} href={item.link} target="_blank" rel="noopener noreferrer">
                    <img src={item.image} alt={`Showcase ${i}`} style={{ width: '300px' }} />
                  </a>
                ))}
              </div>
            </section>

            <section id="features" className={sectionStyles.section} data-section="Features">
              <div className={sectionStyles.info}>
                <ul>
                  {p.features.map((feature: string, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
            </section>

            <section id="future" className={sectionStyles.section} data-section="Future Work">
              <div className={sectionStyles.info}>
                <ul>
                  {p.future.map((item: string, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>
          </article>
        </div>
      </main>
    </PageWrapper>
  );
}
