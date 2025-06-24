'use client';

import Navigation from '@/components/navigation/navigation';
import ProjectList from '@/components/projects/ProjectList';
import styles from './page.module.css';

import { projects } from '@/data/projects';

export default function ProjectsPage() {
  return (
    <>
      <main className={styles.scene}>
        <div className={styles.hero}>
          <div className={styles.introContainer}>
            <h1 className={styles.title}>Projects</h1>
          </div>
        </div>
        <ProjectList
          title="Current & Completed Projects"
          projects={projects.filter((p) => p.status != 'Future Project')}
        />
        <ProjectList
          title="Future Projects"
          projects={projects.filter((p) => p.status === 'Future Project')}
          future
        />
      </main>
    </>
  );
}
