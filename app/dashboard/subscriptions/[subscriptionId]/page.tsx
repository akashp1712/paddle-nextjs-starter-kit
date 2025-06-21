import { LoadingScreen } from '@/components/dashboard/layout/loading-screen';
import { Suspense } from 'react';
import { SubscriptionDetail } from '@/components/dashboard/subscriptions/components/subscription-detail';
import { getSubscription } from '@/utils/paddle/get-subscription';
import { getTransactions } from '@/utils/paddle/get-transactions';

interface Props {
  params: { subscriptionId: string };
}

export default async function SubscriptionPage({ params }: Props) {
  const { subscriptionId } = params;
  
  const [initialSubscriptionResponse, initialTransactionResponse] = await Promise.all([
    getSubscription(subscriptionId),
    getTransactions(subscriptionId, ''),
  ]);

  return (
    <main className="p-4 lg:gap-6 lg:p-8">
      <Suspense fallback={<LoadingScreen />}>
        <SubscriptionDetail 
          subscriptionId={subscriptionId}
          initialSubscriptionResponse={initialSubscriptionResponse}
          initialTransactionResponse={initialTransactionResponse}
        />
      </Suspense>
    </main>
  );
}