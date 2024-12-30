import React from 'react';
import {
  CommonTable,
  type TableRow,
  type TableColumn,
} from '../../components/common/Table/CommonTable';
import { useInvoiceQuery } from '../../lib/queries/invoiceQuery';
import { formatEurCentsToEur } from '../../lib/utils';
import { format } from 'date-fns';

const INVOICE_COLUMNS: TableColumn[] = [
  {
    title: 'Nimi',
    shortTitle: 'Nimi',
  },
  {
    title: 'Yhteystiedot',
    shortTitle: '@',
  },
  {
    title: 'Päivämäärä',
    shortTitle: 'Pvm',
  },
  {
    title: 'Kaasuseos',
    shortTitle: 'Mix',
  },
  {
    title: 'Kuvaus',
    shortTitle: 'Kuv.',
  },
  {
    title: 'Hinta (€)',
    shortTitle: '€',
  },
];

export const Invoice: React.FC = () => {
  const { data } = useInvoiceQuery();

  const rows: TableRow[] =
    data?.map((invoice) => {
      return {
        id: invoice.user.id,
        mainRow: [
          `${invoice.user.surname}, ${invoice.user.forename}`,
          invoice.user.email,
          null,
          null,
          null,
          formatEurCentsToEur(invoice.invoiceTotal),
        ],
        childRows: invoice.invoiceRows.map((row) => [
          null,
          null,
          format(new Date(row.date), 'dd.MM.yyyy HH:mm'),
          row.gasMixture,
          row.description,
          formatEurCentsToEur(row.price),
        ]),
      };
    }) ?? [];

  return (
    <div>
      <h1>Laskutus</h1>
      <div>
        <p>
          Alle on listattu kaikki Täyttöpaikan käyttäjien tekemät{' '}
          <b>maksamattomat</b> täytöt. Voit viedä laskut Excel-tiedostoon
          painamalla oikeassa yläkulmassa olevaa "Vie laskut" -nappia.
        </p>
        <p>
          Huomaa, että kun viet laskut, ne merkitään järjestelmään
          automaattisesti maksetuiksi, eivätkä ne enää listaudu tälle sivulle.
          Älä siis hukkaa saamaasi Excel-tiedostoa!
        </p>
        <p>
          Hätätilanteessa järjestelmän ylläpitäjät saavat taiottua laskut
          uudelleen esille. Jos tarvitset apua, ota yhteyttä ylläpitoon tai
          lähetä sähköpostia palaute@tayttopaikka.fi.
        </p>
      </div>
      <CommonTable columns={INVOICE_COLUMNS} rows={rows} />
    </div>
  );
};
