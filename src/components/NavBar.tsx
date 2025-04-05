import { Heading, Link, Flex, Container } from "@radix-ui/themes";
import NextLink from "next/link";

export const NavBar = () => {
    return (
        <Container>
            <Flex justify='between' align='center'>
                <Heading> 
                    RadixNext
                </Heading>

                <ul className="flex gap-x-2">
                    <li>
                        <Link asChild>
                            <NextLink href="/" passHref>Home</NextLink>
                        </Link>
                    </li>
                    <li>
                        <Link asChild>
                            <NextLink href="/auth/login" passHref>Login</NextLink>
                        </Link>
                    </li>
                    <li>
                        <Link asChild>
                            <NextLink href="/auth/register" passHref>Register</NextLink>
                        </Link>
                    </li>
                    <li>
                        <Link asChild>
                            <NextLink href="/dashboard" passHref>Dashboard</NextLink>
                        </Link>
                    </li>
                </ul>
            </Flex >
        </Container>
    )
}

export default NavBar;