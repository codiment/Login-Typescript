'use client';

import type { Project } from '@prisma/client';
import { Card, Heading, Text } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

interface Props {
  project: Project;
}

const ProjectCard = ({ project }: Props) => {
  const router = useRouter();

  return (
    <Card
      key={project.id}
      className="hover:cursor-pointer hover:opacity-80"
      onClick={() => router.push(`/dashboard/projects/${project.id}`)}
    >
      <Heading mb="3">{project.title}</Heading>
      <Text>{project.description}</Text>
    </Card>
  );
};

export default ProjectCard;
