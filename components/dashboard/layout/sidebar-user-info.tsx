'use client';

import { Separator } from '@/components/ui/separator';
import { LogOut } from 'lucide-react';
import { useClerk, useUser } from '@clerk/nextjs';
import { MouseEvent } from 'react';

export function SidebarUserInfo() {
  const { signOut } = useClerk();
  const { user } = useUser();

  async function handleLogout(e: MouseEvent) {
    e.preventDefault();
    await signOut();
  }

  return (
    <div className={'flex flex-col items-start pb-8 px-2 text-sm font-medium lg:px-4'}>
      <Separator className={'relative mt-6 dashboard-sidebar-highlight bg-[#283031]'} />
      <div className={'flex w-full flex-row mt-6 items-center justify-between'}>
        <div className={'flex flex-col items-start justify-center overflow-hidden text-ellipsis'}>
          <div className={'text-sm leading-5 font-semibold w-full overflow-hidden text-ellipsis'}>
            {user?.fullName || user?.firstName || 'User'}
          </div>
          <div className={'text-sm leading-5 text-muted-foreground w-full overflow-hidden text-ellipsis'}>
            {user?.emailAddresses?.[0]?.emailAddress}
          </div>
        </div>
        <div>
          <LogOut onClick={handleLogout} className={'h-6 w-6 text-muted-foreground cursor-pointer'} />
        </div>
      </div>
    </div>
  );
}
