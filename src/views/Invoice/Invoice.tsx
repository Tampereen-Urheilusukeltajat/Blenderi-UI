import React, { useCallback, useMemo, useState } from 'react';
import {
  CommonTable,
  type TableRow,
  type TableColumn,
} from '../../components/common/Table/CommonTable';
import { type Invoice, useInvoiceQuery } from '../../lib/queries/invoiceQuery';
import { formatEurCentsToEur } from '../../lib/utils';
import { format } from 'date-fns';
import { PrimaryButton } from '../../components/common/Button/Buttons';
import { utils, writeFileXLSX } from 'xlsx';
import { Modal } from '../../components/common/Modal/Modal';
import { toast } from 'react-toastify';

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

export const InvoicePage: React.FC = () => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [exportedData, setExportedData] = useState<Invoice[]>([]);
  const { data } = useInvoiceQuery();

  const rows: TableRow[] = useMemo(
    () =>
      data
        ?.slice()
        .sort((a, b) =>
          `${a.user.surname} ${a.user.forename}`.localeCompare(
            `${b.user.surname} ${b.user.forename}`,
          ),
        )
        .map((invoice) => {
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
        }) ?? [],
    [data],
  );

  const onExportInvoicesButtonClick = useCallback(() => {
    if (data) {
      // generate worksheet from state
      const ws = utils.json_to_sheet(
        data
          .slice()
          .sort((a, b) =>
            `${a.user.surname} ${a.user.forename}`.localeCompare(
              `${b.user.surname} ${b.user.forename}`,
            ),
          )
          .map((invoice) => ({
            Nimi: `${invoice.user.surname} ${invoice.user.forename}`,
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

      // create workbook and append worksheet
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, 'Data');

      // export to XLSX
      writeFileXLSX(
        wb,
        `tayttopaikka_laskut_${new Date().toISOString().split('T')[0]}.xlsx`,
      );

      toast.info(
        'Laskut viety onnistuneesti Excel-tiedostoon. Voit nyt merkitä ladatut laskut laskutetuiksi.',
        {
          autoClose: 30000,
          position: 'top-left',
        },
      );
      setExportedData(data);
    } else {
      toast.error(
        'Odottamaton virhe. Lataa sivu uudestaan ja yritä uudelleen.',
      );
    }
  }, [data]);

  const onConfirmModalOpen = useCallback(() => {
    setIsConfirmModalOpen(true);
  }, []);

  const onConfirmModalClose = useCallback(() => {
    setIsConfirmModalOpen(false);
  }, []);

  const onConfirmModalConfirm = useCallback(() => {
    setIsConfirmModalOpen(false);

    // Mutate
  }, []);

  return (
    <div>
      <Modal
        onClose={onConfirmModalClose}
        onConfirm={onConfirmModalConfirm}
        isOpen={isConfirmModalOpen}
        title="Merkitse tapahtumat laskutetuiksi"
        confirmButtonText="Merkitse laskutetuiksi"
      >
        <p>
          Tarkista ladattu Excel-tiedosto. Mikäli tiedosto on kunnossa, merkitse
          laskut laskutetuiksi ja välitä tarvittava tieto rahastonhoitajalle.
        </p>
      </Modal>
      <h1>Laskutus</h1>
      <div>
        <p>
          Alle on listattu kaikki Täyttöpaikan käyttäjien tekemät{' '}
          <b>laskuttamattomat</b> täytöt. Voit viedä laskut Excel-tiedostoon
          painamalla oikeassa yläkulmassa olevaa "Vie laskut" -nappia.
        </p>
        <p>
          Kun laskut on viety Excel-tiedostoon, ne voidaan merkitä
          laskutetuiksi. Merkkaaminen on käytettävissä vain, kun laskut on viety
          onnistuneesti. Järjestelmä ei sinänsä mene rikki vaikka laskuja ei
          merkattaisikaan laskutetuiksi, mutta mikäli käyttäjille lähetetään
          laskut ladatun tiedoston perusteella, mutta laskuja ei merkata
          laskutetuksi, voi käyttäjälle pahimmillaan lähteä useampi lasku
          samasta täyttötapahtumasta.
        </p>
        <p>
          Kun "Merkitse laskutetuiksi" -nappia painetaan, käyttäjille ilmestyy
          laskun luomisesta tieto. On suositeltavaa, että itse laskujen lähetys
          tapahtuu mahdollisimman pian merkkauksen jälkeen, jotta käyttäjät
          eivät jää ihmettelemään saapumatonta laskua.
        </p>
        <p>
          Laskutettujen täyttöjen tiedot tallennetaan järjestelmään eikä mitään
          tietoa katoa. Järjestelmä ei kuitenkaan tällä hetkellä tue laskujen
          uudelleen esille ottamista.
        </p>
        <p>
          Hätätilanteessa järjestelmän ylläpitäjät saavat taiottua laskut
          uudelleen esille. Jos tarvitset apua, ota yhteyttä ylläpitoon tai
          lähetä sähköpostia{' '}
          <a href="mailto:info@tayttopaikka.fi">info@tayttopaikka.fi</a>.
        </p>
      </div>
      <div>
        <div className="d-flex flex-row justify-content-between pb-2">
          <h2>Laskuttamattomat täyttötapahtumat</h2>
          <div className="d-flex" style={{ gap: '8px' }}>
            <PrimaryButton
              text="Merkitse laskutetuiksi"
              onClick={onConfirmModalOpen}
              disabled={exportedData.length === 0}
            />
            <PrimaryButton
              disabled={data?.length === 0}
              text="Vie laskut"
              onClick={onExportInvoicesButtonClick}
            />
          </div>
        </div>
        <CommonTable columns={INVOICE_COLUMNS} rows={rows} />
      </div>
    </div>
  );
};
