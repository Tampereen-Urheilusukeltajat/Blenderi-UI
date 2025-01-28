import React, { useMemo } from 'react';
import {
  CommonTable,
  type TableRow,
  type TableColumn,
} from '../../components/common/Table/CommonTable';
import { useUsersQuery } from '../../lib/queries/userQuery';

const USER_COLUMNS: TableColumn[] = [
  {
    title: 'Nimi',
    shortTitle: 'Nimi',
  },
  {
    title: 'Puhelinnumero',
    shortTitle: 'Puh.',
  },
  {
    title: 'Sähköposti',
    shortTitle: '@',
  },
  {
    title: 'Jäsen',
    shortTitle: 'Jäsen',
  },
  {
    title: 'Blender',
    shortTitle: 'Blender',
  },
  {
    title: 'Ylläpitäjä',
    shortTitle: 'Admin',
  },
];

export const UsersPage: React.FC = () => {
  const { isError, isLoading, data } = useUsersQuery();

  const userRows = useMemo((): TableRow[] => {
    if (!data || isError || isLoading) {
      return [];
    }

    return data
      .sort((a, b) =>
        `${a.surname} ${a.forename}`.localeCompare(
          `${b.surname} ${b.forename}`,
        ),
      )
      .map((user) => ({
        id: user.id,
        mainRow: [
          `${user.surname}, ${user.forename}`,
          user.phoneNumber,
          user.email,
          user.isUser ? 'X' : '',
          user.isBlender ? 'X' : '',
          user.isAdmin ? 'X' : '',
        ],
      }));
  }, [data, isError, isLoading]);

  return (
    <>
      <div>
        <h1>Käyttäjät</h1>
        <p>
          Tämän sivun kautta voit hallita sovelluksen käyttäjien oikeuksia sekä
          tarkastella seuran jäsenien palveluun liittämiä yhteystietoja.
        </p>

        <table>
          <thead>
            <tr>
              <th>Rooli</th>
              <th>Selitys</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ylläpitäjä</td>
              <td>
                Ylläpitäjällä on täydet oikeudet hallita sovellusta ja sen
                käyttäjiä. Hän voi luoda uusia ylläpitäjiä ja lähettää laskuja.
              </td>
            </tr>
            <tr>
              <td>Blender</td>
              <td>
                Blenderillä on oikeus nähdä "Happihäkki"-sivu sekä tehdä siellä
                koulutuksensa mukaisia täyttöjä.
              </td>
            </tr>
            <tr>
              <td>Jäsen</td>
              <td>Jäsenet voivat tehdä paineilmatäyttöjä omiin pulloihinsa.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <h2>Käyttäjälistaus</h2>
        <CommonTable columns={USER_COLUMNS} rows={userRows} />
      </div>
    </>
  );
};
