import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import {
  type DivingCylinder,
  type DivingCylinderSet,
} from '../../interfaces/DivingCylinderSet';
import { archiveDivingCylinderSet } from '../../lib/apiRequests/divingCylinderSetRequests';
import { useDivingCylinderQuery } from '../../lib/queries/divingCylinderQuery';
import { DIVING_CYLINDER_SETS_QUERY_KEY } from '../../lib/queries/queryKeys';
import { getUserIdFromAccessToken } from '../../lib/utils';
import {
  CommonTable,
  type TableColumn,
  type TableRow,
} from '../common/Table/CommonTable';

const DIVING_CYLINDER_SET_COLUMNS: TableColumn[] = [
  {
    title: 'Nimi',
    shortTitle: 'Nimi',
  },
  {
    title: 'Koko (l)',
    shortTitle: 'l',
  },
  {
    title: 'Materiaali',
    shortTitle: 'Mat',
  },
  {
    title: 'Suurin täyttöpaine (bar)',
    shortTitle: 'bar',
  },
  {
    title: 'Sarjanumero',
    shortTitle: 'SN',
  },
  {
    title: 'Katsastusvuosi',
    shortTitle: 'KV',
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
  divingCylinderSets: DivingCylinderSet[],
): TableRow[] => {
  return divingCylinderSets.map((dcs: DivingCylinderSet) => {
    // Single cylinder so only return mainRow
    if (dcs.cylinders.length === 1) {
      const dc = dcs.cylinders[0];
      return {
        id: dcs.id,
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
      .map((dc: DivingCylinder) => dc.volume)
      .reduce((acc, cv) => acc + cv);
    return {
      id: dcs.id,
      mainRow: [dcs.name, totalSetVolume, null, null, null, null],
      childRows: [
        ...dcs.cylinders.map((dc: DivingCylinder) => [
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
  const queryClient = useQueryClient();

  const { data: divingCylinderSets } = useDivingCylinderQuery(userId);
  const rows = useMemo(
    () => divingCylinderSetsToCommonTableRows(divingCylinderSets ?? []),
    [divingCylinderSets],
  );

  const divingCylinderSetMutation = useMutation<
    unknown,
    undefined,
    { divingCylinderSetId: string }
  >({
    mutationKey: DIVING_CYLINDER_SETS_QUERY_KEY(userId),
    mutationFn: async ({ divingCylinderSetId }) =>
      archiveDivingCylinderSet(divingCylinderSetId),
    onSuccess: (_, { divingCylinderSetId }) => {
      queryClient.setQueryData(DIVING_CYLINDER_SETS_QUERY_KEY(userId), [
        ...(divingCylinderSets?.filter((v) => v.id !== divingCylinderSetId) ??
          []),
      ]);

      toast.success('Pullosetti poistettu näkyvistä.');
    },
    onError: () => {
      toast.error('Pullosetin poistaminen epäonnistui. Yritä uudelleen.');
    },
  });

  const handleDivingCylinderSetDelete = useCallback(
    (divingCylinderSetId: string) => {
      divingCylinderSetMutation.mutate({ divingCylinderSetId });
    },
    [divingCylinderSetMutation],
  );

  return (
    <div>
      <h1 className="pb-4">Omat pullot</h1>
      <div>
        <CommonTable
          columns={DIVING_CYLINDER_SET_COLUMNS}
          rows={rows}
          includeDeleteButton
          onRowDelete={handleDivingCylinderSetDelete}
        />
      </div>
    </div>
  );
};
