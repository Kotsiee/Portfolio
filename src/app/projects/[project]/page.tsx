// app/projects/[project]/page.tsx

import { notFound } from 'next/navigation';
import ProjectClient from './ProjectClient';
import { projects } from '@/data/projects';

export default async function Page({ params }: { params: Promise<{ project: string }> }) {
  const { project } = await params;
  const projectss = projects.find((p) => p.slug === project);
  if (!projectss) return notFound();

  return <ProjectClient project={projectss} />;
}
