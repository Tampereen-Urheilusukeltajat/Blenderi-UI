import { useQueryClient } from '@tanstack/react-query';
import { useDivingCylinderQuery } from '../../lib/queries/divingCylinderQuery';
import { DIVING_CYLINDER_SETS_QUERY_KEY } from '../../lib/queries/queryKeys';
import { getUserIdFromAccessToken } from '../../lib/utils';

import { CommonTableV2 } from '../common/Table/CommonTable-v2';
import {
  createColumnHelper,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { format } from 'date-fns';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { useArchieveDivingCylinderSetMutation } from '../../lib/queries/divingCylinderSetMutation';
import { useCallback, useMemo, useState } from 'react';
import { Modal } from '../common/Modal/Modal';
import { toast } from 'react-toastify';
import { type DivingCylinderSet } from '../../interfaces/DivingCylinderSet';
import { ModifyDivingCylinderSetModal } from './ModifyDivingCylinderSetModal';
import { Tooltip } from 'react-tooltip';

type DivingCylinderTableRow = {
  id: string;
  name?: string;
  volume?: number;
  material?: string;
  maxPressure?: number;
  serialNumber?: string;
  lastInspection?: string;
  cylinders?: DivingCylinderTableRow[];
};

const columnHelper = createColumnHelper<DivingCylinderTableRow>();

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

export const DivingCylinderSetList = (): JSX.Element => {
  const userId = useMemo(() => getUserIdFromAccessToken(), []);
  const queryClient = useQueryClient();
  const { data: divingCylinderSets } = useDivingCylinderQuery(userId);
  const { mutate: archiveDivingCylinder } =
    useArchieveDivingCylinderSetMutation(userId, () => {
      void queryClient.refetchQueries({
        queryKey: DIVING_CYLINDER_SETS_QUERY_KEY(userId),
      });
    });

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [toBeArchivedDivingCylinderSetId, setToBeArchivedDivingCylinderSetId] =
    useState<string | undefined>(undefined);

  const [showModifyModal, setShowModifyModal] = useState(false);
  const [modifiedCylinderSet, setModifiedCylinderSet] = useState<
    DivingCylinderSet | undefined
  >(undefined);

  const tableCylinders: DivingCylinderTableRow[] = useMemo(
    () =>
      divingCylinderSets?.map((dcs) => ({
        id: dcs.id,
        lastInspection: undefined,
        cylinders: dcs.cylinders.map((dc) => ({
          id: dc.id,
          cylinders: [],
          name: undefined,
          volume: dc.volume,
          material: DCMaterialFiTranslation(dc.material),
          maxPressure: dc.pressure,
          serialNumber: dc.serialNumber,
          lastInspection: format(dc.inspection, 'yyyy'),
        })),
        name: dcs.name,
        volume: dcs.cylinders.reduce((acc, dc) => acc + dc.volume, 0),
        material: undefined,
        maxPressure: undefined,
        serialNumber: undefined,
      })) ?? [],
    [divingCylinderSets],
  );

  const DivingCylinderTable = useReactTable({
    columns: [
      columnHelper.accessor('id', {
        id: 'id',
      }),
      columnHelper.accessor('name', {
        id: 'name',
        header: 'Nimi',
      }),
      columnHelper.accessor('volume', {
        id: 'size',
        header: 'Koko (l)',
      }),
      columnHelper.accessor('material', {
        id: 'material',
        header: 'Materiaali',
      }),
      columnHelper.accessor('maxPressure', {
        id: 'maxPressure',
        header: 'Maksimipaine (bar)',
      }),
      columnHelper.accessor('serialNumber', {
        id: 'serialNumber',
        header: 'Sarjanumero',
      }),
      columnHelper.accessor('lastInspection', {
        id: 'lastInspection',
        header: 'Katsastusvuosi',
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Toiminnot',
        cell: (cell) => {
          const isSubRow = cell.row.depth > 0;
          if (isSubRow) return null;

          const rowId = cell.row.id;
          return (
            <div className="d-flex justify-content-center gap-2">
              <button
                data-tooltip-id={`modify-set-${rowId}`}
                data-tooltip-content={'Muokkaa pullosettiä'}
                className="btn btn-primary"
                onClick={() => {
                  setModifiedCylinderSet(
                    divingCylinderSets?.find(
                      (dcs) => dcs.id === cell.row.getValue('id'),
                    ),
                  );
                  setShowModifyModal(true);
                }}
              >
                <BsPencil />
              </button>
              <button
                data-tooltip-id={`delete-set-${rowId}`}
                data-tooltip-content={'Poista pullosetti'}
                className="btn btn-danger"
                onClick={() => {
                  setToBeArchivedDivingCylinderSetId(cell.row.getValue('id'));
                  setConfirmModalOpen(true);
                }}
              >
                <BsTrash />
              </button>
              <Tooltip id={`modify-set-${rowId}`} />
              <Tooltip id={`delete-set-${rowId}`} />
            </div>
          );
        },
      }),
    ],
    data: tableCylinders,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: (row) => row.cylinders,
    state: {
      columnVisibility: {
        id: false,
      },
      expanded: true,
    },
  });

  const handleArchiveConfirm = useCallback(() => {
    if (!toBeArchivedDivingCylinderSetId) {
      return toast.error(
        'Jotain meni pieleen. Lataa sivu uudelleen ja yritä uudestaan',
      );
    }
    archiveDivingCylinder(toBeArchivedDivingCylinderSetId);
    setToBeArchivedDivingCylinderSetId(undefined);
    setConfirmModalOpen(false);
  }, [archiveDivingCylinder, toBeArchivedDivingCylinderSetId]);

  return (
    <div>
      <h1 className="pb-4">Omat pullot</h1>
      <div>
        <CommonTableV2 table={DivingCylinderTable} />
      </div>
      <Modal
        isOpen={confirmModalOpen}
        title="Poista pullosetti"
        onClose={() => {
          setConfirmModalOpen(false);
        }}
        onConfirm={handleArchiveConfirm}
      >
        Haluatko varmasti poistaa pullosetin? Tätä toimintoa ei voi peruuttaa.
      </Modal>
      {modifiedCylinderSet && (
        <ModifyDivingCylinderSetModal
          closeModal={() => {
            setShowModifyModal(false);
            setModifiedCylinderSet(undefined);
          }}
          showModifyDivingCylinderModal={showModifyModal}
          divingCylinderSet={modifiedCylinderSet}
          userId={userId}
        />
      )}
    </div>
  );
};
