import React from 'react';
import styles from './NewPaymentEvent.module.scss';
import { PrimaryButton } from '../common/Button/Buttons';
import format from 'date-fns/format';

type NewPaymentEventProps = {
  creatingNewPaymentEventDisabled: boolean;
  totalPrice: number;
  totalFillEvents: number;
  firstPaymentEventDate: Date;
  lastPaymentEventDate: Date;
};

export const NewPaymentEvent: React.FC<NewPaymentEventProps> = ({
  firstPaymentEventDate,
  lastPaymentEventDate,
  totalFillEvents,
  totalPrice,
  creatingNewPaymentEventDisabled,
}) => {
  return (
    <div className="pb-4">
      <h1>Aloita uusi maksutapahtuma</h1>
      <div className={`${styles.box as string} d-flex flex-row`}>
        <div className="w-75">
          <h2>Yleistiedot</h2>
          <p>
            Maksutapahtumaa luodessa järjestelmä hakee automaattisesti kaikki
            maksamattomat täyttötapahtumat. Täyttötapahtumat tulee maksaa kaikki
            kerrallaan. Maksuvaihtoehtoina ovat tällä hetkellä maksukortit.
          </p>
          <p>
            Täyttötapahtumien hintaan ei lisätä maksutapalisää, vaan se on
            huomioitu jo kaasuja hinnoitellessa. Huomaa kuitenkin, että pienin
            sallittu maksu on 10&nbsp;€.
          </p>
          <p>
            Maksupalvelun tarjoaa{' '}
            <a href="https://stripe.com/en-fi" target="_blank">
              Stripe
            </a>
            .
          </p>
          <PrimaryButton
            disabled={creatingNewPaymentEventDisabled}
            text="Aloita maksutapahtuma"
          />
        </div>
        <div className="ps-1 w-25">
          <h2>Lisätiedot</h2>
          <p>
            Alle on kerätty tiedot täyttötapahtumista, joita et ole vielä
            maksanut.
          </p>
          <div>
            <span>Hinta: </span>
            <span>{totalPrice}&nbsp;€</span>
          </div>
          <div>
            <span>Tapahtumia yhteensä: </span>
            <span>{totalFillEvents}</span>
          </div>

          <div>
            <span>Aikaväli: </span>
            <span>
              {format(firstPaymentEventDate, 'd.M.yy')} -{' '}
              {format(lastPaymentEventDate, 'd.M.yy')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
