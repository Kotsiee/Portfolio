'use client';

import styles from './ProjectList.module.css';
import ProjectItem from './ProjectItem';
import useImageHover from '@/hooks/useImageHover';
import useProjectReveal from '@/hooks/useProjectReveal';

export default function ProjectList({
  title,
  projects,
  future = false,
}: {
  title: string;
  projects: any[];
  future?: boolean;
}) {
  const { imgRef, handleMouseEnter, handleMouseLeave } = useImageHover();
  useProjectReveal();

  return (
    <section>
      <h2>{title}</h2>
      <img className={styles.projectImg} ref={imgRef} />
      <div className={styles.projectsList}>
        {projects.map((project, i) => (
          <ProjectItem
            key={i}
            project={{ ...project, future }}
            onEnter={handleMouseEnter}
            onLeave={handleMouseLeave}
          />
        ))}
      </div>
    </section>
  );
}
