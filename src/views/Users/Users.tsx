import React, { useCallback } from 'react';
import { useUsersQuery } from '../../lib/queries/userQuery';

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { CommonTableV2 } from '../../components/common/Table/CommonTable-v2';
import { type UserRoles, type User } from '../../lib/apiRequests/userRequests';
import { useUserRolesMutation } from '../../lib/queries/userMutations';
import { getUserIdFromAccessToken } from '../../lib/utils';

const columnHelper = createColumnHelper<User>();

export const UsersPage: React.FC = () => {
  const userId = getUserIdFromAccessToken();
  const { data } = useUsersQuery();
  const { mutate: updateUserRoles } = useUserRolesMutation();

  const onCheckboxChange = useCallback(
    (userId: string, column: keyof UserRoles, currentValue: boolean) => {
      updateUserRoles({
        userId,
        payload: {
          [column]: !currentValue,
        },
      });
    },
    [updateUserRoles],
  );
  const userTable = useReactTable({
    columns: [
      columnHelper.accessor('id', {
        id: 'id',
      }),
      columnHelper.accessor((row) => `${row.surname}, ${row.forename}`, {
        id: 'fullName',
        header: 'Nimi',
        cell: (user) => user.getValue(),
      }),
      columnHelper.accessor('phoneNumber', {
        header: 'Puhelinnumero',
        cell: (user) => user.getValue(),
      }),
      columnHelper.accessor('email', {
        header: 'Sähköposti',
        cell: (user) => user.getValue(),
      }),
      columnHelper.accessor('isUser', {
        header: 'Jäsen',
        cell: (cell) => (
          <div style={{ textAlign: 'center' }}>
            <input
              onChange={() => {
                onCheckboxChange(
                  cell.row.getValue('id'),
                  cell.column.id as keyof UserRoles,
                  !!cell.getValue(),
                );
              }}
              type="checkbox"
              checked={cell.getValue()}
            />
          </div>
        ),
      }),
      columnHelper.accessor('isBlender', {
        header: 'Blender',
        cell: (cell) => (
          <div style={{ textAlign: 'center' }}>
            <input
              disabled={cell.row.getValue('id') === userId}
              onChange={() => {
                onCheckboxChange(
                  cell.row.getValue('id'),
                  cell.column.id as keyof UserRoles,
                  !!cell.getValue(),
                );
              }}
              type="checkbox"
              checked={cell.getValue()}
            />
          </div>
        ),
      }),
      columnHelper.accessor('isAdmin', {
        header: 'Ylläpitäjä',
        cell: (cell) => (
          <div style={{ textAlign: 'center' }}>
            <input
              disabled={cell.row.getValue('id') === userId}
              onChange={() => {
                onCheckboxChange(
                  cell.row.getValue('id'),
                  cell.column.id as keyof UserRoles,
                  !!cell.getValue(),
                );
              }}
              type="checkbox"
              checked={cell.getValue()}
            />
          </div>
        ),
      }),
    ],
    data:
      data?.sort((a, b) =>
        `${a.surname} ${a.forename}`.localeCompare(
          `${b.surname} ${b.forename}`,
        ),
      ) ?? [],
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility: {
        id: false,
        isUser: false,
      },
    },
  });

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
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <h2>Käyttäjälistaus</h2>
        <CommonTableV2 table={userTable} />
      </div>
    </>
  );
};
