import { DashboardPageHeader } from '@/components/dashboard/layout/dashboard-page-header';
import { PaymentsContent } from '@/components/dashboard/payments/payments-content';
import { LoadingScreen } from '@/components/dashboard/layout/loading-screen';
import { Suspense } from 'react';
import { getTransactions } from '@/utils/paddle/get-transactions';

interface Props {
  params: { subscriptionId: string };
}

export default async function SubscriptionsPaymentPage({ params }: Props) {
  const { subscriptionId } = params;
  const initialTransactionResponse = await getTransactions(subscriptionId, '');

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8">
      <DashboardPageHeader pageTitle={'Payments'} />
      <Suspense fallback={<LoadingScreen />}>
        <PaymentsContent 
          subscriptionId={subscriptionId} 
          initialTransactionResponse={initialTransactionResponse}
        />
      </Suspense>
    </main>
  );
}