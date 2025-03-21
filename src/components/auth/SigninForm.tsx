'use client'

import { Button, Flex, TextField } from "@radix-ui/themes"
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons"

function SigninForm() {
    return (
        <Flex direction="column" gap="3">
            <label htmlFor="email" className="pt-4">Email</label>
            <TextField.Root type="email" placeholder="Email" radius="large" autoFocus>
                <TextField.Slot>
                    <EnvelopeClosedIcon height="16" width="16" />
                </TextField.Slot>
            </TextField.Root>

            <label htmlFor="password">Password</label>
            <div className="pb-5">
                <TextField.Root type="password" placeholder="Password" radius="large">
                    <TextField.Slot>
                        <LockClosedIcon height="16" width="16" />
                    </TextField.Slot>
                </TextField.Root>
            </div>

            <Button style={{ cursor: "pointer" }} radius="full" color="gray" variant="soft">
                <div className="text-white">
                    Sign In
                </div>
            </Button>
        </Flex>
    )
}

export default SigninForm;