'use client'

import { Button, Flex, TextField } from "@radix-ui/themes"
import { PersonIcon, LockClosedIcon } from "@radix-ui/react-icons"

function SignupForm() {
    return (
        <Flex direction="column" gap="3">
            <label htmlFor="name" className="pt-4">Name</label>
            <TextField.Root type="text" placeholder="Write your name" radius="large" autoFocus>
                <TextField.Slot>
                    <PersonIcon height='16' width='16'/>
                </TextField.Slot>
            </TextField.Root>

            <label htmlFor="email">Email</label>
            <TextField.Root type="email" placeholder="Email" radius="large">
                <TextField.Slot>
                    <PersonIcon height='16' width='16'/>
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
                    Sign Up
                </div>
            </Button>
        </Flex>
    )
}

export default SignupForm;