import SignupForm from '@/components/auth/SignupForm';
import { Card, Container, Flex, Heading, Link, Text } from '@radix-ui/themes';
import NavLink from 'next/link';

function RegisterPage() {
  return (
    <>
      <Container size="1" height={'100%'} className="p-3 md:p-0 bg-black">
        <Flex className="h-screen w-full items-center">
          <Card className="w-full bg-black">
            <div className="p-7">
              <Heading mb="4">Sign Up</Heading>
              <SignupForm />
              <Flex gap="4" className="pt-8" justify="center">
                <Text>Already have an account?</Text>
                <Link asChild>
                  <NavLink
                    href="/auth/login"
                    className="text-white hover:text-gray-300 transition-all"
                  >
                    Sign In
                  </NavLink>
                </Link>
              </Flex>
            </div>
          </Card>
        </Flex>
      </Container>
    </>
  );
}

export default RegisterPage;
