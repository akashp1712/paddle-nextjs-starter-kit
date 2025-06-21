export const dynamic = 'force-dynamic';

import { HomePage } from '@/components/home/home-page';
import Header from '@/components/home/header/header';

export default function Home() {
  return (
    <>
      <Header />
      <HomePage />
    </>
  );
}