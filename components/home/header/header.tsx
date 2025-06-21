import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { auth } from '@clerk/nextjs/server';

export default async function Header() {
  const { userId } = await auth();

  return (
    <nav>
      <div className="mx-auto max-w-7xl relative px-[32px] py-[18px] flex items-center justify-between">
        <div className="flex flex-1 items-center justify-start">
          <Link className="flex items-center" href={'/'}>
            <Image className="w-auto block" src="/logo.svg" width={131} height={28} alt="AeroEdit" />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <div className="flex space-x-4">
            {userId ? (
              <Button variant={'secondary'} asChild={true}>
                <Link href={'/dashboard'}>Dashboard</Link>
              </Button>
            ) : (
              <Button asChild={true} variant={'secondary'}>
                <Link href={'/sign-in'}>Sign in</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
