'use client';

import { Button, Heading } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

const HeaderDashboard = () => {
  const router = useRouter();

  return (
    <div className="flex justify-between px-4 md:px-0">
      <Heading>Projects</Heading>
      <Button onClick={() => router.push('/dashboard/projects/new')} style={{ cursor: 'pointer' }}>
        Add Project
      </Button>
    </div>
  );
};

export default HeaderDashboard;
