import { CommonTable } from '../CommonTable';

const DIVING_CYLINDER_SET_COLUMNS = [
  'Nimi',
  'Koko (l)',
  'Materiaali',
  'Koeponnistuspaine (bar)',
  'Sarjanumero',
  'Katsastusvuosi',
];

const TEMP_TEST_ROWS = [
  ['Mun D12', '24', 'Teräs', '300', '11-22-33-55', '2016'],
  ['Mun sinkkupullo', '10', 'Teräs', '450', '55-22-33-55', '2020'],
];

export const DivingCylinderSetList = (): JSX.Element => {
  return (
    <div>
      <h2>Omat pullot</h2>
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
