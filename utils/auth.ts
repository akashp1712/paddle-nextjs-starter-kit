import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function getCurrentUser() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  return userId;
}

export async function requireAuth() {
  const userId = await getCurrentUser();

  if (!userId) {
    throw new Error('Authentication required');
  }

  return userId;
}

export async function getCustomerByClerkId(clerkUserId: string) {
  return await prisma.customer.findUnique({
    where: { clerkUserId },
    include: {
      subscriptions: true,
    },
  });
}

export async function getCustomerByEmail(email: string) {
  return await prisma.customer.findUnique({
    where: { email },
    include: {
      subscriptions: true,
    },
  });
}
