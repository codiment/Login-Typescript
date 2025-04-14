import { Container } from '@radix-ui/themes';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Home Page',
  description: 'Home Page Description',
};

function HomePage() {
  return (
    <Container>
      <header className="my-4 bg-slate-900 p-10 rounded-md">
        <h1 className="text-7xl my-10">Home Page</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae praesentium
          dignissimos quos totam sapiente iste temporibus dicta animi eaque quae mollitia quo eum
          voluptatibus laborum, recusandae, alias dolores fuga doloremque.
        </p>
        <div className="mt-5">
          <Link href="auth/login" className="text-2xl text-white bg-blue-500 px-2 py-1 rounded-md">
            Login
          </Link>
        </div>
      </header>
    </Container>
  );
}
export default HomePage;
