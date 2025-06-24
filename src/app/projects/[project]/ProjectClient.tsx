'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import HeroTitle from '@/components/ui/HeroTitle';
import AnimatedHeading from '@/components/ui/AnimatedHeading';
import AsideNav from '@/components/navigation/AsideNav';
import PageWrapper from '@/components/layout/PageWrapper';
import styles from './page.module.css';
import sectionStyles from '@/components/ui/AboutSection.module.css';
import Image from 'next/image';
import { IProjects } from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'motivation', label: 'Motivation' },
  { id: 'process', label: 'Process' },
  { id: 'showcase', label: 'Showcase' },
  { id: 'features', label: 'Features' },
  { id: 'future', label: 'Future Work' },
];

export default function ProjectClient({ project }: { project: IProjects }) {
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

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <PageWrapper>
      <main className={styles.scene}>
        <div className={styles.hero}>
          <div className={styles.introContainer}>
            <HeroTitle text={project.title} />
          </div>
        </div>

        <div className={styles.contentWrapper} ref={contentWrapperRef}>
          <div ref={asideRef}>
            <AsideNav items={sections} />
          </div>

          <article className={styles.content}>
            <AnimatedHeading targetSections={sections}>Overview</AnimatedHeading>

            <section id="overview" className={sectionStyles.section}>
              <p
                className={sectionStyles.info}
                dangerouslySetInnerHTML={{ __html: project.overview || '' }}
              />
              <div className={sectionStyles.visual}>
                <p>
                  <b>Tech Stack</b>
                  <br />
                  {project.techStack.join(', ')}
                </p>
              </div>
            </section>

            <section id="motivation" className={sectionStyles.section}>
              <p className={sectionStyles.info}>{project.motivation}</p>
            </section>

            <section id="process" className={sectionStyles.section}>
              <div className={sectionStyles.info}>
                {project.process?.map((step, i) => (
                  <div key={i} style={{ marginBottom: '2rem' }}>
                    <p>
                      <b>{step.step}</b>
                    </p>
                    <p>{step.evidence}</p>
                    {step.image[0] && (
                      <div className={sectionStyles.visual}>
                        <Image src={step.image[0]} alt={step.step} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section id="showcase" className={sectionStyles.section}>
              <div className={sectionStyles.visual} style={{ flexWrap: 'wrap', gap: '2rem' }}>
                {project.showcase?.map((item, i) => (
                  <a key={i} href={item.link} target="_blank" rel="noopener noreferrer">
                    <Image src={item.image} alt={`Showcase ${i}`} width={300} height={100} />
                  </a>
                ))}
              </div>
            </section>

            <section id="features" className={sectionStyles.section}>
              <ul className={sectionStyles.info}>
                {project.features?.map((f: string, i: number) => <li key={i}>{f}</li>)}
              </ul>
            </section>

            <section id="future" className={sectionStyles.section}>
              <ul className={sectionStyles.info}>
                {project.future?.map((f: string, i: number) => <li key={i}>{f}</li>)}
              </ul>
            </section>
          </article>
        </div>
      </main>
    </PageWrapper>
  );
}
