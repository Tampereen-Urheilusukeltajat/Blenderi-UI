import React from 'react';
import { type DivingCylinderSet } from '../../interfaces/DivingCylinderSet';
import { Formik } from 'formik';
import { Modal } from '../common/Modal/Modal';
import { Form } from 'react-bootstrap';
import { TextInput } from '../common/Inputs';
import { format } from 'date-fns';
import { usePatchDivingCylinderSet } from '../../lib/queries/divingCylinderSetMutation';
import { DIVING_CYLINDER_SETS_QUERY_KEY } from '../../lib/queries/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { PATCH_DIVING_CYLINDER_SET_VALIDATION_SCHEMA } from './validation';

type ModifyDivingCylinderSetModalProps = {
  divingCylinderSet: DivingCylinderSet;
  showModifyDivingCylinderModal: boolean;
  closeModal: () => void;
  userId: string;
};

export const ModifyDivingCylinderSetModal: React.FC<
  ModifyDivingCylinderSetModalProps
> = ({
  divingCylinderSet,
  showModifyDivingCylinderModal,
  closeModal,
  userId,
}) => {
  const queryClient = useQueryClient();
  const { mutate: patchDivingCylinderSet } = usePatchDivingCylinderSet(
    userId,
    () => {
      void queryClient.refetchQueries({
        queryKey: DIVING_CYLINDER_SETS_QUERY_KEY(userId),
      });
      closeModal();
    },
  );

  return (
    <Formik
      initialValues={{
        name: divingCylinderSet.name,
        inspectionYear: format(
          divingCylinderSet.cylinders[0].inspection,
          'yyyy',
        ),
      }}
      validationSchema={PATCH_DIVING_CYLINDER_SET_VALIDATION_SCHEMA}
      onSubmit={(values) => {
        const updatePayload = {
          name: values.name,
          cylinders: divingCylinderSet.cylinders.map((dc) => ({
            id: dc.id,
            inspection: format(values.inspectionYear, 'yyyy-MM-dd'),
          })),
        };

        patchDivingCylinderSet({
          divingCylinderSetId: divingCylinderSet.id,
          payload: updatePayload,
        });
      }}
    >
      {({ errors, handleSubmit }) => (
        <Modal
          isOpen={showModifyDivingCylinderModal}
          title="Muokkaa pullosettiä"
          onClose={() => {
            closeModal();
          }}
          onConfirm={handleSubmit}
        >
          <Form>
            <TextInput
              className="w-100"
              name="name"
              errorText={errors.name}
              label="Nimi"
            />
            <TextInput
              className="w-100"
              name="inspectionYear"
              autoComplete="family-name"
              errorText={errors.inspectionYear}
              label="Katsastusvuosi"
            />
          </Form>
        </Modal>
      )}
    </Formik>
  );
};
