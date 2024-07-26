import { useParams } from 'react-router-dom';
import { usePaymentEventQuery } from '../../lib/queries/paymentQuery';
import { Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { StripePayForm } from '../../components/Payments/StripePayForm';
import { type PaymentEvent } from '../../lib/apiRequests/payment';

const stripePublicApiKey = import.meta.env.VITE_STRIPE_PUBLIC_API_KEY as string;
if (!stripePublicApiKey) {
  throw new Error('Missing env variable "VITE_STRIPE_PUBLIC_API_KEY"');
}

const stripePromise = loadStripe(stripePublicApiKey);

const StripePaymentForm: React.FC<{ paymentEvent: PaymentEvent }> = ({
  paymentEvent,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  return (
    <>
      <h1>Maksa täyttötapahtumat</h1>
      {stripe !== null && elements !== null && (
        <StripePayForm
          paymentEvent={paymentEvent}
          elements={elements}
          stripe={stripe}
        />
      )}
    </>
  );
};

export const Pay: React.FC = () => {
  const { paymentEventId } = useParams<{ paymentEventId: string }>();
  const { data: paymentEvent, isError } = usePaymentEventQuery(paymentEventId);

  return (
    <>
      {isError && (
        <div>Jotain meni pieleen. Palaa alkuun ja yritä uudelleen.</div>
      )}
      {paymentEvent?.stripePaymentClientSecret && (
        <Elements
          options={{
            clientSecret: paymentEvent.stripePaymentClientSecret,
            appearance: {
              theme: 'stripe',
              labels: 'floating',
            },
          }}
          stripe={stripePromise}
        >
          <StripePaymentForm paymentEvent={paymentEvent} />
        </Elements>
      )}
    </>
  );
};