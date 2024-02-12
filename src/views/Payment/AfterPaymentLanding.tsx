import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { usePaymentEventQuery } from '../../lib/queries/paymentQuery';
import { toast } from 'react-toastify';
import { PaymentStatus } from '../../lib/apiRequests/payment';

export const AfterPaymentLanding: React.FC = () => {
  const { paymentEventId } = useParams<{ paymentEventId: string }>();
  const { data: paymentEvent, isLoading } =
    usePaymentEventQuery(paymentEventId);
  const navigate = useNavigate();

  useEffect(() => {
    if (paymentEvent?.status === PaymentStatus.completed) {
      toast.success('Kiitos maksustasi.');
      navigate('/payment');
    }
    if (paymentEvent?.status === PaymentStatus.failed) {
      toast.error(
        'Maksun suoritus epäonnistui. Tarkista kortin tiedot ja yritä uudelleen'
      );
      navigate('/payment');
    }
    if (paymentEvent?.status === PaymentStatus.inProgress) {
      toast.warning(
        'Maksu on vielä kesken. Tarkista maksun tila hetken kulttua uudestaan.'
      );
      navigate('/payment');
    }
    if (paymentEvent?.status === PaymentStatus.created) {
      toast.error('Jotain meni pieleen. Tarkista maksun tiedot.');
      navigate('/payment');
    }
  }, [paymentEvent, navigate]);

  return (
    <>
      {!isLoading && (
        <div>
          <h1>
            Jotain meni pieleen. Tarkista maksun tila "
            <Link to={'/payment'}>Maksut</Link>" -sivun kautta.
          </h1>
        </div>
      )}
    </>
  );
};
