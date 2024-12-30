import React, { useCallback } from 'react';
import {
  CommonTable,
  type TableRow,
  type TableColumn,
} from '../../components/common/Table/CommonTable';
import { useInvoiceQuery } from '../../lib/queries/invoiceQuery';
import { formatEurCentsToEur } from '../../lib/utils';
import { format } from 'date-fns';
import { PrimaryButton } from '../../components/common/Button/Buttons';
import { utils, writeFileXLSX } from 'xlsx';

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

  const onExportInvoicesButtonClick = useCallback(() => {
    if (data) {
      /* generate worksheet from state */
      const ws = utils.json_to_sheet(
        data.map((invoice) => ({
          Nimi: `${invoice.user.surname}, ${invoice.user.forename}`,
          Yhteystiedot: invoice.user.email,
          'Hinta (€)': formatEurCentsToEur(invoice.invoiceTotal),
          Tapahtumat: invoice.invoiceRows
            .map(
              (row) =>
                `${format(new Date(row.date), 'dd.MM.yyyy HH:mm')} ${row.gasMixture} ${row.description} ${formatEurCentsToEur(row.price)} €`,
            )
            .join(', '),
        })),
      );

      /* create workbook and append worksheet */
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, 'Data');

      /* export to XLSX */
      writeFileXLSX(wb, `laskut-${new Date().toISOString()}.xlsx`);
    }
  }, [data]);

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
      <div>
        <div className="d-flex flex-row justify-content-between pb-2">
          <h2>Avoimet laskut</h2>
          <PrimaryButton
            disabled={data?.length === 0}
            text="Vie laskut"
            onClick={onExportInvoicesButtonClick}
          />
        </div>
        <CommonTable columns={INVOICE_COLUMNS} rows={rows} />
      </div>
    </div>
  );
};
