import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type UseMutation } from './common';
import { toast } from 'react-toastify';
import { type Invoice } from './invoiceQuery';
import { createInvoicePaymentEvents } from '../apiRequests/invoiceRequests';
import { INVOICE_QUERY_KEY } from './queryKeys';

export type PaymentEvent = {
  id: string;
  userId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  totalAmountEurCents: number;
};

export const useInvoicePaymentEventsMutation = (
  onSuccess: () => void,
): UseMutation<PaymentEvent[], Invoice[]> => {
  const queryClient = useQueryClient();
  const { isError, data, mutate, isPending } = useMutation({
    mutationFn: async (payload: Invoice[]) =>
      createInvoicePaymentEvents(payload),
    onError: () => {
      toast.error('Laskujen merkkaaminen epäonnistui. Yritä uudelleen.');
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: INVOICE_QUERY_KEY });
      onSuccess();
    },
  });

  return {
    isPending,
    isError,
    data,
    mutate,
  };
};
