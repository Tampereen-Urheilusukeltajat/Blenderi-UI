import React, { useCallback } from 'react';
import { TextInput } from '../../common/Inputs';
import { PrimaryButton, SecondaryButton } from '../../common/Button/Buttons';

type InputField = {
  label: string;
  fieldName: string;
};

type EditableUserVariableRowProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
  fields: InputField[];
  disableSaving: boolean;
  changeEditingStatus: () => void;
  resetFields: () => void;
  submitForm: () => void;
  hideInput?: boolean;
  requirePassword?: boolean;
};

export const EditableUserVariableRow: React.FC<
  EditableUserVariableRowProps
> = ({
  disableSaving,
  errors,
  fields,
  changeEditingStatus,
  resetFields,
  requirePassword = false,
  submitForm,
}) => {
  const handleCancelButtonClick = useCallback(() => {
    changeEditingStatus();
    resetFields();
  }, [changeEditingStatus, resetFields]);

  const handleSubmitButtonClick = useCallback(() => {
    submitForm();
  }, [submitForm]);

  return (
    <div className="d-flex flex-row justify-content-between pb-4">
      <div className="d-flex flex-column">
        {fields.map(({ label, fieldName }) => (
          <TextInput
            className="pb-2"
            errorText={errors[fieldName]}
            label={label}
            key={fieldName}
            name={fieldName}
          />
        ))}

        {requirePassword ? (
          <TextInput
            autoComplete="current-password"
            errorText={errors.password}
            name="password"
            label="Nykyinen salasana"
            type="password"
            validate={(value: string) =>
              value.length === 0 ? 'Kenttä on pakollinen' : null
            }
          />
        ) : null}
      </div>
      <div className="d-flex flex-column justify-content-around">
        <PrimaryButton
          onClick={handleSubmitButtonClick}
          text="Tallenna"
          disabled={disableSaving}
        />
        <SecondaryButton onClick={handleCancelButtonClick} text="Peruuta" />
      </div>
    </div>
  );
};
