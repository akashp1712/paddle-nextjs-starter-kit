'use client';

import { getTransactions } from '@/utils/paddle/get-transactions';
import { ErrorContent } from '@/components/dashboard/layout/error-content';
import { DataTable } from '@/components/dashboard/payments/components/data-table';
import { columns } from '@/components/dashboard/payments/components/columns';
import { useEffect, useState } from 'react';
import { LoadingScreen } from '@/components/dashboard/layout/loading-screen';
import { usePagination } from '@/hooks/usePagination';
import { TransactionResponse } from '@/lib/api.types';

interface Props {
  subscriptionId: string;
  initialTransactionResponse?: TransactionResponse;
}

export function PaymentsContent({ subscriptionId, initialTransactionResponse }: Props) {
  const { after, goToNextPage, goToPrevPage, hasPrev } = usePagination();

  const [transactionResponse, setTransactionResponse] = useState<TransactionResponse>(
    initialTransactionResponse || {
      data: [],
      hasMore: false,
      totalRecords: 0,
      error: undefined,
    }
  );
  const [loading, setLoading] = useState(!initialTransactionResponse);

  useEffect(() => {
    // Only fetch if we don't have initial data or if pagination has changed
    if (!initialTransactionResponse || after) {
      (async () => {
        setLoading(true);
        const response = await getTransactions(subscriptionId, after);
        if (response) {
          setTransactionResponse(response);
        }
        setLoading(false);
      })();
    }
  }, [subscriptionId, after, initialTransactionResponse]);

  if (!transactionResponse || transactionResponse.error) {
    return <ErrorContent />;
  } else if (loading) {
    return <LoadingScreen />;
  }

  const { data: transactionData, hasMore, totalRecords } = transactionResponse;
  return (
    <div>
      <DataTable
        columns={columns}
        hasMore={hasMore}
        totalRecords={totalRecords}
        goToNextPage={goToNextPage}
        goToPrevPage={goToPrevPage}
        hasPrev={hasPrev}
        data={transactionData ?? []}
      />
    </div>
  );
}