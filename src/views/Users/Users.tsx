import React, { useCallback, useMemo } from 'react';
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
const roleColumnHelpere = createColumnHelper<{
  role: string;
  explanation: string;
}>();

const roleTableColumns = [
  roleColumnHelpere.accessor('role', {
    id: 'role',
    header: 'Rooli',
  }),
  roleColumnHelpere.accessor('explanation', {
    id: 'explanation',
    header: 'Selitys',
  }),
];

const roles = [
  {
    role: 'Jäsen',
    explanation:
      'Seuran aktiivinen, jäsenmaksun maksanut jäsen. Ilman tätä roolia, ei voi tehdä mitään täyttöjä (paitsi jos on ylläpitäjä).',
  },
  {
    role: 'Nitrox blender',
    explanation:
      'Suppeamman CMAS Nitrox Gas Blender -kurssin käynyt jäsen. Näkee Happihäkki -näkymän ja voi tehdä koulutuksensa mukaisia täyttöjä.',
  },
  {
    role: 'Trimix blender',
    explanation:
      'Laajemman CMAS Trimix Gas Blender -kurssin käynyt jäsen. Ei anna lisää oikeuksia tässä kohtaa, mutta tulevaisuudessa voi antaa lisäoikeuksia Happihäkki -näkymään.',
  },
  {
    role: 'Kouluttaja',
    explanation:
      'Seuran kouluttaja. Ei käytännössä anna vielä mitään lisäoikeuksia.',
  },
  {
    role: 'Ylläpitäjä',
    explanation:
      'Näkee kaiken ja voi tehdä lähtökohtaisesti mitä haluaa sovelluksessa. Tulisi antaa harkiten, sillä rooli ohittaa KAIKKI rajoitukset.',
  },
];

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

  const roleTable = useReactTable({
    columns: roleTableColumns,
    data: roles,
    getCoreRowModel: getCoreRowModel(),
  });

  const userData = useMemo(
    () =>
      data?.sort((a, b) =>
        `${a.surname} ${a.forename}`.localeCompare(
          `${b.surname} ${b.forename}`,
        ),
      ) ?? [],
    [data],
  );

  const userColumns = useMemo(
    () => [
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
        header: 'Nitrox blender',
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
      columnHelper.accessor('isAdvancedBlender', {
        header: 'Trimix blender',
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
      columnHelper.accessor('isInstructor', {
        header: 'Kouluttaja',
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
    [userId, onCheckboxChange],
  );

  const userTable = useReactTable({
    columns: userColumns,
    data: userData,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility: {
        id: false,
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

        <CommonTableV2 table={roleTable} />
      </div>
      <div className="mt-4">
        <h2>Käyttäjälistaus</h2>
        <CommonTableV2 table={userTable} />
      </div>
    </>
  );
};
