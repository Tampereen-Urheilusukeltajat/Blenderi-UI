import { PaymentIntent } from '@stripe/stripe-js';
import { authGetAsync } from './api';

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
