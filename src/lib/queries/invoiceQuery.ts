import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { type UseQuery } from './common';
import { INVOICE_QUERY_KEY } from './queryKeys';
import { useEffect } from 'react';
import { getInvoices } from '../apiRequests/invoiceRequests';

export type InvoiceRow = {
  id: number;
  date: string;
  description: string;
  gasMixture: string;
  price: number;
};

export type MinifiedUser = {
  id: string;
  email: string;
  forename: string;
  surname: string;
};

export type Invoice = {
  user: MinifiedUser;
  invoiceTotal: number;
  invoiceRows: InvoiceRow[];
};

export const useInvoiceQuery = (): UseQuery<Invoice[]> => {
  const { isLoading, data, isError } = useQuery({
    queryKey: INVOICE_QUERY_KEY,
    queryFn: async () => getInvoices(),
    retry: 1,
    staleTime: 0,
  });

  useEffect(() => {
    if (isError) {
      toast.error('Laskujen hakeminen epäonnistui. Yritä uudelleen.');
    }
  }, [isError]);

  return {
    data,
    isLoading,
    isError,
  };
};
