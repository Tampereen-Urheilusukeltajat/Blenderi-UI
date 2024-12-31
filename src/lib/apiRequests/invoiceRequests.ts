import { type Invoice } from '../queries/invoiceQuery';
import { authGetAsync } from './api';

export const getInvoices = async (): Promise<Invoice[]> => {
  const response = await authGetAsync<Invoice[]>('/api/invoicing');

  return response.data;
};
