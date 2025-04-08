'use client';

import { ExitIcon, GearIcon, PersonIcon } from '@radix-ui/react-icons';
import { Button, Container, Flex, Heading, Link } from '@radix-ui/themes';
import { Avatar, DropdownMenu } from '@radix-ui/themes';
import { signOut, useSession } from 'next-auth/react';
import NextLink from 'next/link';

export const NavBar = () => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  console.log(session);

  return (
    <nav className="bg-zinc-950 py-4">
      <Container>
        <Flex justify="between" align="center">
          <NextLink href="/">
            <Heading>RadixNext</Heading>
          </NextLink>

          <ul className="flex gap-9 items-center">
            {!isAuthenticated ? (
              <>
                <li>
                  <Link asChild>
                    <NextLink href="/auth/login" passHref>
                      Login
                    </NextLink>
                  </Link>
                </li>
                <li>
                  <Link asChild>
                    <NextLink href="/auth/register" passHref>
                      Register
                    </NextLink>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link asChild>
                    <NextLink href="/dashboard" passHref>
                      Dashboard
                    </NextLink>
                  </Link>
                </li>
                <li>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <Button variant="ghost" radius="full">
                        <Avatar
                          size="2"
                          src={session?.user?.image || ''}
                          fallback={session?.user?.name?.[0] || 'U'}
                          radius="full"
                        />
                      </Button>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Content>
                      <DropdownMenu.Label>{session?.user?.name || 'User'}</DropdownMenu.Label>
                      <DropdownMenu.Item>
                        <Flex gap="2" align="center">
                          <PersonIcon />
                          Profile
                        </Flex>
                      </DropdownMenu.Item>

                      <DropdownMenu.Item>
                        <Flex gap="2" align="center">
                          <GearIcon />
                          Settings
                        </Flex>
                      </DropdownMenu.Item>

                      <DropdownMenu.Separator />

                      <DropdownMenu.Item color="red" onClick={() => signOut({ callbackUrl: '/' })}>
                        <Flex gap="2" align="center">
                          <ExitIcon />
                          Logout
                        </Flex>
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </li>
              </>
            )}
          </ul>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
