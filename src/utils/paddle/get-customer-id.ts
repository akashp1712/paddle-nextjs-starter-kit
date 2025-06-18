import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function getCustomerId() {
  const user = await currentUser();
  
  if (!user?.emailAddresses?.[0]?.emailAddress) {
    return '';
  }

  const email = user.emailAddresses[0].emailAddress;
  
  const customer = await prisma.customer.findUnique({
    where: { email },
    select: { customerId: true },
  });

  return customer?.customerId ?? '';
}