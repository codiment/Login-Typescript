import { Container, Card, Heading, Flex, Text, Link } from "@radix-ui/themes";
import SigninForm from "@/components/auth/SigninForm";
import NavLink from "next/link";

function LoginPage() {
    return (
        <>
            <Container size='1' height={'100%'} className='p-3 md:p-0 bg-black'>
                <Flex className='h-screen w-full items-center'>
                    <Card className='w-full bg-violet-500'>
                        <div className="p-7">
                            <Heading>Sign In</Heading>
                            <SigninForm />
                            <Flex gap='4' className="pt-8" justify='center'>
                                <Text>
                                  Don&#39;t have an account?
                                </Text>
                                <Link asChild>
                                    <NavLink href='/auth/register' className="text-white hover:text-gray-300 transition-all" >
                                        Sign Up
                                    </NavLink>
                                </Link>
                            </Flex>
                        </div>
                    </Card>
                </Flex>
            </Container>
        </>
    )
}

export default LoginPage;