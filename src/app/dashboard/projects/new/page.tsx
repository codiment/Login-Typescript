'use client';

import { Button, Card, Container, Flex, Heading, TextArea, TextField } from '@radix-ui/themes';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const TaskNewPage = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const res = await axios.post('/api/projects', data);

    if (res.status === 201) {
      router.push('/dashboard');
    }

    console.log(res);
  });

  return (
    <Container size="1" height={'100%'} className="p-3 md:p-0 bg-black">
      <Flex className="h-screen w-full items-center">
        <Card className="w-full">
          <div className="p-7">
            <form className="flex flex-col gap-y-5" onSubmit={onSubmit}>
              <Heading mb="5">Project</Heading>

              <label htmlFor="title">Project title</label>

              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField.Root
                    id="title"
                    size="2"
                    placeholder="Project title..."
                    radius="medium"
                    {...field}
                  />
                )}
              />

              <label htmlFor="description">Project Description</label>

              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextArea
                    id="description"
                    placeholder="Project description..."
                    radius="medium"
                    {...field}
                  />
                )}
              />

              <Button radius="full" type="submit" style={{ cursor: 'pointer' }}>
                Create Project
              </Button>
            </form>
          </div>
        </Card>
      </Flex>
    </Container>
  );
};

export default TaskNewPage;
