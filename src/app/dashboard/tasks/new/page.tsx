'use client'

import { Button, Card, Container, Flex, Heading, TextArea, TextField } from '@radix-ui/themes';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

const TaskNewPage = () => {

  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: '',
      description: '',
    }
  });

  const onSubmit = handleSubmit( async(data) => {
    console.log(data);
    const res = await axios.post('/api/projects' , data)
    console.log(res);
  })

  return (
    <Container size="1" height={'100%'} className="p-3 md:p-0 bg-black">
      <Flex className='h-screen w-full items-center'>
        <Card className='w-full'>

          <div className='p-7'>
            <form className='flex flex-col gap-y-5' onSubmit={onSubmit}>

              <Heading mb='5'>Project</Heading>

              <label>Project title</label>

              <Controller
                name='title'
                control={control}
                render={({ field }) => {
                  return (
                    <TextField.Root size='2' placeholder='Search the docs...' radius='medium' {...field} />
                  )
                }}

              />

              <label>
                Project Description
              </label>

              <Controller
                name='description'
                control={control}
                render={({ field }) => {
                  return (
                    <TextArea placeholder='Reply to comment...' radius='medium' {...field} />
                  )
                }}

              />



              <Button radius='full' type='submit'>
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
