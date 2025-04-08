'use client';

import { EnvelopeClosedIcon, LockClosedIcon, PersonIcon } from '@radix-ui/react-icons';
import { Button, Flex, TextField } from '@radix-ui/themes';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

function SignupForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    const res = await axios.post('/api/auth/register', data);
    console.log(res);

    if (res.status === 201) {
      const result = await signIn('credentials', {
        redirect: false,
        email: res.data.email,
        password: data.password,
      });

      if (!result?.ok) {
        console.log(result?.error);
        return;
      } else {
        router.push('/dashboard');
      }
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Flex direction="column" gap="3">
        <label htmlFor="name" className="pt-4">
          Name
        </label>
        <Controller
          name="name"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Name is required',
            },
          }}
          render={({ field }) => {
            return (
              <TextField.Root
                type="text"
                placeholder="Write your name"
                radius="large"
                autoFocus
                color="blue"
                {...field}
              >
                <TextField.Slot>
                  <PersonIcon height="16" width="16" />
                </TextField.Slot>
              </TextField.Root>
            );
          }}
        />

        {errors.name && <p className="text-red-300 text-sm">Name is required</p>}

        <label htmlFor="email">Email</label>
        <Controller
          name="email"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Email is required',
            },
          }}
          render={({ field }) => {
            return (
              <TextField.Root
                type="email"
                placeholder="Email"
                radius="large"
                color="blue"
                {...field}
              >
                <TextField.Slot>
                  <EnvelopeClosedIcon height="16" width="16" />
                </TextField.Slot>
              </TextField.Root>
            );
          }}
        />

        {errors.email && <p className="text-red-300 text-sm">Email is required</p>}

        <label htmlFor="password">Password</label>
        <Controller
          name="password"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Password is required',
            },
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long',
            },
          }}
          render={({ field }) => {
            return (
              <TextField.Root
                type="password"
                placeholder="Password"
                radius="large"
                color="blue"
                {...field}
              >
                <TextField.Slot>
                  <LockClosedIcon height="16" width="16" />
                </TextField.Slot>
              </TextField.Root>
            );
          }}
        />

        {errors.password && <p className="text-red-300 text-sm">{errors.password.message}</p>}

        <Button
          style={{ cursor: 'pointer' }}
          radius="full"
          color="gray"
          variant="soft"
          mt="5"
          type="submit"
        >
          <div className="text-white">Sign Up</div>
        </Button>
      </Flex>
    </form>
  );
}

export default SignupForm;
