'use server';

import { requireAuth } from '@/utils/auth';
import { Subscription } from '@paddle/paddle-node-sdk';
import { revalidatePath } from 'next/cache';
import { getPaddleInstance } from '@/utils/paddle/get-paddle-instance';

const paddle = getPaddleInstance();

interface Error {
  error: string;
}

export async function cancelSubscription(subscriptionId: string): Promise<Subscription | Error> {
  try {
    await requireAuth();

    const subscription = await paddle.subscriptions.cancel(subscriptionId, {
      effectiveFrom: 'next_billing_period',
    });

    if (subscription) {
      revalidatePath('/dashboard/subscriptions');
    }

    return JSON.parse(JSON.stringify(subscription));
  } catch (e) {
    console.error('Error canceling subscription:', e);
    return { error: 'Something went wrong, please try again later' };
  }
}
