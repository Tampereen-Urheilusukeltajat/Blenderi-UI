import { type PaymentEvent } from '../queries/invoicePaymentEventMutation';
import { type Invoice } from '../queries/invoiceQuery';
import { authGetAsync, authPostAsync } from './api';

export const getInvoices = async (): Promise<Invoice[]> => {
  const response = await authGetAsync<Invoice[]>('/api/invoicing');

  return response.data;
};

export const createInvoicePaymentEvents = async (
  invoices: Invoice[],
): Promise<PaymentEvent[]> =>
  (
    await authPostAsync<PaymentEvent[], Invoice[]>(
      '/api/invoicing/payment-events',
      invoices,
    )
  ).data;
