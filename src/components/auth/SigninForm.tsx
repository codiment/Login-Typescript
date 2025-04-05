'use client'

import { Button, Flex, TextField } from "@radix-ui/themes"
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons"
import { useForm, Controller } from "react-hook-form"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"


function SigninForm() {

    const router = useRouter();

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = handleSubmit(async (data) => {
        console.log(data);
        const res = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
        })
        if (!res?.ok) {
            console.log(res);
        }

        router.push('/dashboard');
    });

    return (
        <form onSubmit={onSubmit}>
            <Flex direction="column" gap="3">
                <label htmlFor="email" className="pt-4">Email</label>
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field }) => {
                        return (
                            <TextField.Root type="email" placeholder="Email" radius="large" autoFocus {...field}>
                                <TextField.Slot>
                                    <EnvelopeClosedIcon height="16" width="16" />
                                </TextField.Slot>
                            </TextField.Root>
                        )
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
                            message: "Password is required"
                        },
                    }}
                    render={({ field }) => (
                        <TextField.Root type="password" placeholder="Password" radius="large" {...field}>
                            <TextField.Slot>
                                <LockClosedIcon height="16" width="16" />
                            </TextField.Slot>
                        </TextField.Root>
                    )}
                />

                {errors.password && <p className="text-red-300 text-sm">{errors.password.message}</p>}

                <Button style={{ cursor: "pointer" }} radius="full" color="gray" variant="soft" type='submit' mt='4'>
                    <div className="text-white">
                        Sign In
                    </div>
                </Button>
            </Flex>
        </form>
    )
}

export default SigninForm;