import HeaderDashboard from '@/components/dashboard/HeaderDashboard';
import { prisma } from '@/libs/prisma';
import { Card, Container, Grid, Heading, Text } from '@radix-ui/themes';

async function loadProjects() {
  return await prisma.project.findMany();
}

async function DashboardPage() {
  const projects = await loadProjects();
  console.log(projects);

  return (
    <Container className="mt-10">
      <HeaderDashboard />

      <Grid gap="5" columns="3" pt="7">
        {projects.map((project) => (
          <Card key={project.id} className="hover:cursor-pointer hover:opacity-80">
            <Heading mb="3">{project.title}</Heading>
            <Text>{project.description}</Text>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}

export default DashboardPage;
