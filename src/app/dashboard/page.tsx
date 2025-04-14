import HeaderDashboard from '@/components/dashboard/HeaderDashboard';
import ProjectCard from '@/components/dashboard/projects/ProjectCard';
import { prisma } from '@/libs/prisma';
import { Container, Grid } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

async function loadProjects(userId: number) {
  return await prisma.project.findMany({
    where: {
      userId,
    },
  });
}

async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const projects = await loadProjects(Number.parseInt(session?.user.id as string));
  console.log(projects);

  return (
    <Container className="mt-10 px-4 sm:px-6 md:px-0">
      <HeaderDashboard />

      <Grid gap="5" columns={{ initial: '1', sm: '2', md: '3' }} pt="7" pb="7">
        {projects.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </Grid>
    </Container>
  );
}

export default DashboardPage;
