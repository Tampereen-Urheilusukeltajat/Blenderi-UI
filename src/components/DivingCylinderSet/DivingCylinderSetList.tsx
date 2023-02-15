import { useMemo } from 'react';
import { DivingCylinderSet } from '../../interfaces/DivingCylinderSet';
import { useDivingCylinderQuery } from '../../lib/queries/divingCylinderQuery';
import { getUserIdFromAccessToken } from '../../lib/utils';
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

export enum DivingCylinderMaterials {
  steel = 'steel',
  aluminium = 'aluminium',
  carbonFiber = 'carbonFiber',
}

const DCMaterialFiTranslation = (enMaterial: string): string => {
  switch (enMaterial) {
    case DivingCylinderMaterials.aluminium:
      return 'Alumiini';
    case DivingCylinderMaterials.carbonFiber:
      return 'Hiilikuitu';
    case DivingCylinderMaterials.steel:
      return 'Teräs';
    default:
      return enMaterial;
  }
};

const divingCylinderSetsToCommonTableRows = (
  divingCylinderSets: DivingCylinderSet[]
): TableRow[] => {
  return divingCylinderSets.map((dcs) => {
    // Single cylinder so only return mainRow
    if (dcs.cylinders.length === 1) {
      const dc = dcs.cylinders[0];
      return {
        mainRow: [
          dcs.name,
          dc.volume,
          DCMaterialFiTranslation(dc.material),
          dc.pressure,
          dc.serialNumber,
          new Date(dc.inspection).getFullYear(),
        ],
      };
    }

    const totalSetVolume = dcs.cylinders
      .map((dc) => dc.volume)
      .reduce((pv, cv) => (pv += cv));
    return {
      mainRow: [dcs.name, totalSetVolume, null, null, null, null],
      childRows: [
        ...dcs.cylinders.map((dc) => [
          null,
          dc.volume,
          DCMaterialFiTranslation(dc.material),
          dc.pressure,
          dc.serialNumber,
          new Date(dc.inspection).getFullYear(),
        ]),
      ],
    };
  });
};

export const DivingCylinderSetList = (): JSX.Element => {
  const userId = useMemo(() => getUserIdFromAccessToken(), []);

  const divingCylinderSets = useDivingCylinderQuery(userId);
  const rows = useMemo(
    () => divingCylinderSetsToCommonTableRows(divingCylinderSets.data ?? []),
    [divingCylinderSets]
  );

  return (
    <div>
      <h1>Omat pullot</h1>
      <div>
        <CommonTable columns={DIVING_CYLINDER_SET_COLUMNS} rows={rows} />
      </div>
    </div>
  );
};
