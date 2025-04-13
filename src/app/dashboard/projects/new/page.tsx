'use client';

import { CheckIcon, TrashIcon } from '@radix-ui/react-icons';
import { Button, Card, Container, Flex, Heading, TextArea, TextField } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

const TaskNewPage = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const router = useRouter();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

   if (!params.projectId) {
      const res = await axios.post('/api/projects', data);
      if (res.status === 201) {
        router.push('/dashboard')
      }
      
    } else {
      console.log('updating')
    }
  });

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
                {params.projectId? 'Save' : 'Create'}
                <CheckIcon/>
              </Button>

              <Button radius='full' style={{ cursor : 'pointer '}} color='red'>
                {params.projectId? 'Delete' : 'Cancel'}
                <TrashIcon/>
              </Button>
            </form>
            
          </div>
        </Card>
      </Flex>
    </Container>
  );
};

export default TaskNewPage;
