import { PaymentIntent } from '@stripe/stripe-js';
import { authGetAsync, authPostAsync } from './api';

export enum PaymentStatus {
  created = 'CREATED',
  inProgress = 'IN_PROGRESS',
  failed = 'FAILED',
  completed = 'COMPLETED',
}

export type PaymentEvent = {
  id: string;
  userId: string;
  status: PaymentStatus;
  createdAt: string;
  updatedAt: string;
  totalAmountEurCents: number;
  stripePaymentMethod?: string;
  stripeAmountEurCents?: number;
  stripePaymentStatus?: PaymentIntent.Status;
  stripePaymentClientSecret?: string;
};

export const getPaymentEvent = async (
  paymentEventId: string
): Promise<PaymentEvent> => {
  const response = await authGetAsync<PaymentEvent>(
    `/api/payment/${paymentEventId}`
  );

  return response.data;
};

export const getPaymentEvents = async (): Promise<PaymentEvent[]> => {
  const response = await authGetAsync<PaymentEvent[]>('/api/payment');

  return response.data;
};

export const createPaymentEvent = async (): Promise<PaymentEvent> => {
  const response = await authPostAsync<PaymentEvent, Record<string, unknown>>(
    '/api/payment',
    {}
  );

  return response.data;
};
