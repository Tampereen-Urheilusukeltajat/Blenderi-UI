import { CommonTable, TableColumn, TableRow } from '../common/Table';

const DIVING_CYLINDER_SET_COLUMNS: TableColumn[] = [
  {
    title: 'Nimi',
  },
  {
    title: 'Koko (l)',
  },
  {
    title: 'Materiaali',
  },
  {
    title: 'Suurin täyttöpaine (bar)',
  },
  {
    title: 'Sarjanumero',
  },
  {
    title: 'Katsastusvuosi',
  },
];

const TEMP_TEST_ROWS: TableRow[] = [
  {
    // Parser which creates this is going to be lit ! :)
    mainRow: ['Mun D12', 24, null, null, null, null],
    childRows: [
      [null, 12, 'Teräs', 200, '11-22-33-44-55', '2016'],
      [null, 12, 'Teräs', 200, '66-77-88-99-00', '2016'],
    ],
  },
  {
    mainRow: ['Mun sinkkupullo', 10, 'Teräs', 300, '55-22-33-55', '2020'],
  },
  {
    mainRow: ['Mun toka sinkkupullo', 12, 'Teräs', 200, '55-42-33-55', '2013'],
  },
];

export const DivingCylinderSetList = (): JSX.Element => {
  return (
    <div>
      <h1>Omat pullot</h1>
      <div>
        <CommonTable
          columns={DIVING_CYLINDER_SET_COLUMNS}
          rows={TEMP_TEST_ROWS}
          includeDeleteButton
          includeEditButton
        />
      </div>
    </div>
  );
};
