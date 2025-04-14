'use client';

import { CheckIcon, TrashIcon } from '@radix-ui/react-icons';
import { Button, Card, Container, Flex, Heading, TextArea, TextField } from '@radix-ui/themes';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
const TaskNewPage = () => {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const router = useRouter();
  const params = useParams() as { projectId: string };

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    if (!params.projectId) {
      const res = await axios.post('/api/projects', data);
      if (res.status === 201) {
        router.push('/dashboard');
      }
    } else {
      const res = await axios.put(`/api/projects/${params.projectId}`, data);
      if (res.status === 200) {
        router.push('/dashboard');
      }
    }
  });

  const handleDelete = async (projectId: string) => {
    console.log(projectId);
    const res = await axios.delete(`/api/projects/${projectId}`);

    if (res.status === 200) {
      router.push('/dashboard');
      toast.success('Project deleted');
    }
  };

  useEffect(() => {
    if (params.projectId) {
      axios.get(`/api/projects/${params.projectId}`).then((res) => {
        console.log(res.data);
        setValue('title', res.data.title);
        setValue('description', res.data.description);
      });
    }
  }, [params.projectId, setValue]);

  return (
    <Container size="1" height={'100%'} className="p-3 md:p-0 bg-black">
      <Flex className="h-screen w-full items-center">
        <Card className="w-full">
          <div className="p-7">
            <form className="flex flex-col gap-y-5" onSubmit={onSubmit}>
              <Heading mb="5">{params.projectId ? 'Edit Project' : 'New Project'}</Heading>

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
                {params.projectId ? 'Save' : 'Create'}
                <CheckIcon />
              </Button>

              <Button
                radius="full"
                style={{ cursor: 'pointer ' }}
                color="red"
                onClick={() => handleDelete(params.projectId)}
              >
                {params.projectId ? 'Delete' : 'Cancel'}
                <TrashIcon />
              </Button>
            </form>
          </div>
        </Card>
      </Flex>
    </Container>
  );
};

export default TaskNewPage;
