'use client'

import { Button, Flex, TextField } from "@radix-ui/themes"
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons"
import { useForm, Controller } from "react-hook-form"

function SigninForm() {

    const { control, handleSubmit } = useForm();

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });

    return (
        <form onSubmit={onSubmit}>
            <Flex direction="column" gap="3">
                <label htmlFor="email" className="pt-4">Email</label>
                <Controller
                    name="name"
                    control={control}
                    render={() => {
                        return (
                            <TextField.Root type="email" placeholder="Email" radius="large" autoFocus>
                                <TextField.Slot>
                                    <EnvelopeClosedIcon height="16" width="16" />
                                </TextField.Slot>
                            </TextField.Root>
                        )
                    }}
                />

                <label htmlFor="password">Password</label>
                <div className="pb-5">
                    <TextField.Root type="password" placeholder="Password" radius="large">
                        <TextField.Slot>
                            <LockClosedIcon height="16" width="16" />
                        </TextField.Slot>
                    </TextField.Root>
                </div>

                <Button style={{ cursor: "pointer" }} radius="full" color="gray" variant="soft" type='submit'>
                    <div className="text-white">
                        Sign In
                    </div>
                </Button>
            </Flex>
        </form>
    )
}

export default SigninForm;