/* eslint-disable @typescript-eslint/no-misused-promises */
import { AddressElement, PaymentElement } from '@stripe/react-stripe-js';
import { type FormEvent, useCallback } from 'react';
import styles from './StripePayForm.module.scss';
import { PrimaryButton, SecondaryButton } from '../common/Button/Buttons';
import { type PaymentEvent } from '../../lib/apiRequests/payment';
import { formatEurCentsToEur } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { type UseMutation } from '../../lib/queries/common';
import { type Stripe, type StripeElements } from '@stripe/stripe-js';
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_BASE_URL as string;
if (!BASE_URL) throw new Error('Env variable "VITE_BASE_URL" is not set');

type StripePayFormProps = {
  paymentEvent: PaymentEvent;
  stripe: Stripe;
  elements: StripeElements;
};

const useStripeConfirmPayment = (
  paymentEventId: string,
  stripe: Stripe,
  elements: StripeElements,
): UseMutation<void, void> => {
  const { isPending, isError, mutate } = useMutation({
    mutationFn: async () =>
      stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${BASE_URL}/payment/${paymentEventId}/success`,
        },
      }),
    // onSuccess actually fires only when there has been an error :D
    // If the payment is really succesful the user will be redirected
    // to return_url and the app will handle the situation from there
    // See AfterPaymentLanding.tsx
    onSuccess: ({ error }) => {
      toast.error(error.message ?? 'Tuntematon virhe. Yritä uudelleen');
    },
    onError: () => {
      toast.error('Tuntematon virhe. Yritä uudelleen');
    },
  });

  return {
    mutate,
    isPending,
    isError,
  };
};

export const StripePayForm: React.FC<StripePayFormProps> = ({
  paymentEvent,
  elements,
  stripe,
}) => {
  const navigate = useNavigate();
  const { mutate: confirmStripePayment, isPending } = useStripeConfirmPayment(
    paymentEvent.id,
    stripe,
    elements,
  );

  const handleCancel = useCallback(() => {
    navigate('/payment');
  }, [navigate]);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      confirmStripePayment();
    },
    [confirmStripePayment],
  );

  return (
    <div className={`${styles.box as string}`}>
      <form id="payment-form" onSubmit={handleSubmit}>
        <div className="d-flex gap-3">
          <div className="w-75">
            <h2>Maksa kortilla</h2>
            <AddressElement
              options={{
                mode: 'billing',
                allowedCountries: ['fi'],
              }}
            />
            <PaymentElement
              id="payment-element"
              options={{
                layout: 'tabs',
                business: {
                  name: 'Tampereen Urheilusukeltajat ry',
                },
              }}
            />

            <div className="d-flex pt-4 gap-2 justify-content-end w-100">
              <PrimaryButton
                className="w-50"
                disabled={isPending}
                text="Maksa"
                onClick={handleSubmit}
              />
              <SecondaryButton
                className="w-50"
                disabled={isPending}
                text="Palaa takaisin"
                onClick={handleCancel}
              />
            </div>
          </div>

          <div className={styles.leftBorder}>
            <div className="d-flex flex-column">
              <div className={`${styles.info as string}`}>
                <h2>Maksun tiedot</h2>
                <p>
                  Maksu happihäkissä suoritetuista kaasutäytöistä. Maksu
                  suoritetaan Tampereen Urheilusukeltajat ry:lle.
                </p>
                <p className={styles.total}>
                  Hinta yhteensä{' '}
                  <span className={styles.sum}>
                    {formatEurCentsToEur(
                      paymentEvent.stripeAmountEurCents ?? 0,
                    )}{' '}
                  </span>
                  €
                </p>
              </div>
            </div>
            <p>
              Maksupalvelun tarjoaa{' '}
              <a href="https://stripe.com/en-fi" target="_blank">
                Stripe
              </a>
              . Maksamalla hyväksyt{' '}
              <a href="https://stripe.com/en-fi/legal/ssa" target="_blank">
                Stripen ehdot
              </a>
              .
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
