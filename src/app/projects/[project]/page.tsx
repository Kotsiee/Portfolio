// app/projects/[project]/page.tsx

import { notFound } from 'next/navigation';
import ProjectClient from './ProjectClient';
import { projects } from '@/data/projects';

export default function ProjectPage({ params }: { params: { project: string } }) {
  const slug = params.project;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  return <ProjectClient project={project} />;
}
