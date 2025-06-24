'use client';

import styles from './ProjectItem.module.css';

type Project = {
  slug: string;
  title: string;
  type: string;
  dates: string;
  description: string;
  techStack: string[];
  image: string;
  future?: boolean;
};

export default function ProjectItem({
  project,
  onEnter,
  onLeave,
}: {
  project: Project;
  onEnter: (src: string) => void;
  onLeave: () => void;
}) {
  return (
    <a
      href={`/projects/${project.slug}`}
      className={styles.projectItem}
      onMouseEnter={() => onEnter(project.image)}
      onMouseLeave={onLeave}
    >
      <div className={styles.projectHeader}>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.projectType}>{project.type}</p>
        <p className={styles.projectDates}>
          {project.future ? 'Proposed Start: ' : ''}
          {project.dates}
        </p>
      </div>
      <div className={styles.projectDescriptionContainer}>
        <p className={styles.projectDescription}>{project.description}</p>
        <div className={styles.projectTechStack}>
          <p className={styles.projectTechStackName}>
            {project.future ? 'Proposed Tech Stack' : 'Tech Stack'}
          </p>
          <p>{project.techStack.join(', ')}</p>
        </div>
      </div>
    </a>
  );
}
