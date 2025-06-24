'use client';

import styles from './ProjectList.module.css';
import ProjectItem from './ProjectItem';
import useImageHover from '@/hooks/useImageHover';
import useProjectReveal from '@/hooks/useProjectReveal';
import Image from 'next/image';
import { IProjects } from '@/data/projects';

export default function ProjectList({
  title,
  projects,
  future = false,
}: {
  title: string;
  projects: IProjects[];
  future?: boolean;
}) {
  const { imgRef, handleMouseEnter, handleMouseLeave } = useImageHover();
  useProjectReveal();

  return (
    <section>
      <h2>{title}</h2>
      <Image
        className={styles.projectImg}
        ref={imgRef}
        src={'/env/nx.png'}
        alt={''}
        height={200}
        width={300}
      />
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
