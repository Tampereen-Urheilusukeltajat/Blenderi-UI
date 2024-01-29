import { useParams } from 'react-router-dom';
import { usePaymentEventQuery } from '../../lib/queries/paymentQuery';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { StripePayForm } from '../../components/Pay/StripePayForm';

const stripePublicApiKey = process.env.REACT_APP_STRIPE_PUBLIC_API_KEY;
if (!stripePublicApiKey) {
  throw new Error('Missing env variable "REACT_APP_STRIPE_PUBLIC_API_KEY"');
}

const stripePromise = loadStripe(stripePublicApiKey);

export const Pay: React.FC = () => {
  const { paymentEventId } = useParams<{ paymentEventId: string }>();
  const { data: paymentEvent, isError } = usePaymentEventQuery(paymentEventId);

  return (
    <>
      {isError && (
        <div>Jotain meni pieleen. Palaa alkuun ja yritä uudelleen.</div>
      )}
      {paymentEvent && (
        <Elements
          options={{
            clientSecret: paymentEvent.stripePaymentClientSecret,
          }}
          stripe={stripePromise}
        >
          <StripePayForm />
        </Elements>
      )}
    </>
  );
};
