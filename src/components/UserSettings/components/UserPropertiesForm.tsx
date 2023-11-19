import React, { useCallback } from 'react';
import { FormUser } from '../UserSettings';
import { PrimaryButton, SecondaryButton } from '../../common/Button/Buttons';
import { TextInput } from '../../common/Inputs';
import { EditableUserVariableRow } from './EditableUserVariableRow';
import { Form } from 'formik';
import styles from '../UserSettings.module.scss';

type UserPropertiesFormProps = {
  dirty: boolean;
  editingName: boolean;
  editingEmail: boolean;
  editingPhone: boolean;
  editingNewPassword: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
  handleSubmit: () => void;
  handleReset: () => void;
  setEditingName: (b: boolean) => void;
  setEditingEmail: (b: boolean) => void;
  setEditingPhone: (b: boolean) => void;
  setEditingNewPassword: (b: boolean) => void;
  values: FormUser;
};

type UserVariableRowProps = {
  title: string;
  content: string;
  handleEditButtonClick: () => void;
};

type NewPasswordRowProps = {
  disableSaving: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
  changeEditingStatus: () => void;
  resetFields: () => void;
  submitForm: () => void;
};

const UserVariableRow: React.FC<UserVariableRowProps> = ({
  content,
  handleEditButtonClick,
  title,
}) => {
  return (
    <div className="d-flex flex-row justify-content-between pb-4">
      <div className="d-flex flex-column">
        <span className={styles.title}>{title}</span>
        <span>{content}</span>
      </div>
      <PrimaryButton onClick={handleEditButtonClick} text="Muokkaa" />
    </div>
  );
};

const NewPasswordRow: React.FC<NewPasswordRowProps> = ({
  disableSaving,
  errors,
  changeEditingStatus,
  resetFields,
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
    <div className="d-flex flex-row justify-content-between">
      <div className="d-flex flex-column">
        <TextInput
          autoComplete="current-password"
          className="pb-2"
          errorText={errors.password}
          name="password"
          label="Nykyinen salasana"
          type="password"
          validate={(value: string) =>
            value.length === 0 ? 'Kenttä on pakollinen' : null
          }
        />
        <TextInput
          autoComplete="new-password"
          className="pb-2"
          errorText={errors.newPassword}
          name="newPassword"
          label="Uusi salasana"
          type="password"
        />
        <TextInput
          autoComplete="new-password"
          className="pb-2"
          errorText={errors.newPasswordAgain}
          name="newPasswordAgain"
          label="Uusi salasana uudestaan"
          type="password"
        />
      </div>
      <div className="d-flex flex-column justify-content-around">
        <PrimaryButton
          disabled={disableSaving}
          onClick={handleSubmitButtonClick}
          text="Tallenna"
        />
        <SecondaryButton onClick={handleCancelButtonClick} text="Peruuta" />
      </div>
    </div>
  );
};

export const UserPropertiesForm: React.FC<UserPropertiesFormProps> = ({
  dirty,
  editingEmail,
  editingName,
  editingNewPassword,
  editingPhone,
  errors,
  handleReset,
  handleSubmit,
  setEditingEmail,
  setEditingName,
  setEditingNewPassword,
  setEditingPhone,
  values,
}) => {
  /**
   * TODO refactor this form state handling
   */
  const changeNameEditingStatus = useCallback(() => {
    setEditingName(!editingName);

    // Set all other fields to false and reset form
    handleReset();
    setEditingEmail(false);
    setEditingPhone(false);
    setEditingNewPassword(false);
  }, [
    editingName,
    setEditingEmail,
    setEditingName,
    setEditingNewPassword,
    setEditingPhone,
    handleReset,
  ]);

  const changeEmailEditingStatus = useCallback(() => {
    setEditingEmail(!editingEmail);

    // Set all other fields to false and reset form
    handleReset();
    setEditingName(false);
    setEditingPhone(false);
    setEditingNewPassword(false);
  }, [
    editingEmail,
    setEditingEmail,
    setEditingName,
    setEditingNewPassword,
    setEditingPhone,
    handleReset,
  ]);

  const changePhoneEditingStatus = useCallback(() => {
    setEditingPhone(!editingPhone);

    // Set all other fields to false and reset form
    handleReset();
    setEditingName(false);
    setEditingEmail(false);
    setEditingNewPassword(false);
  }, [
    editingPhone,
    setEditingEmail,
    setEditingName,
    setEditingNewPassword,
    setEditingPhone,
    handleReset,
  ]);

  const changeNewPasswordEditingStatus = useCallback(() => {
    setEditingNewPassword(!editingNewPassword);

    // Set all other fields to false and reset form
    handleReset();
    setEditingName(false);
    setEditingEmail(false);
    setEditingPhone(false);
  }, [
    editingNewPassword,
    setEditingEmail,
    setEditingName,
    setEditingNewPassword,
    setEditingPhone,
    handleReset,
  ]);

  return (
    <Form>
      {!editingName ? (
        <UserVariableRow
          title="Nimi"
          content={`${values.forename} ${values.surname}`}
          handleEditButtonClick={changeNameEditingStatus}
        />
      ) : (
        <EditableUserVariableRow
          disableSaving={!dirty}
          errors={errors}
          fields={[
            { fieldName: 'forename', label: 'Etunimi' },
            { fieldName: 'surname', label: 'Sukunimi' },
          ]}
          changeEditingStatus={changeNameEditingStatus}
          resetFields={handleReset}
          submitForm={handleSubmit}
        />
      )}
      {!editingEmail ? (
        <UserVariableRow
          title="Sähköposti"
          content={values.email}
          handleEditButtonClick={changeEmailEditingStatus}
        />
      ) : (
        <EditableUserVariableRow
          disableSaving={!dirty}
          errors={errors}
          fields={[{ fieldName: 'email', label: 'Sähköposti' }]}
          changeEditingStatus={changeEmailEditingStatus}
          resetFields={handleReset}
          requirePassword
          submitForm={handleSubmit}
        />
      )}
      {!editingPhone ? (
        <UserVariableRow
          title="Puhelinnumero"
          content={values.phoneNumber}
          handleEditButtonClick={changePhoneEditingStatus}
        />
      ) : (
        <EditableUserVariableRow
          disableSaving={!dirty}
          errors={errors}
          fields={[{ fieldName: 'phoneNumber', label: 'Puhelinnumero' }]}
          changeEditingStatus={changePhoneEditingStatus}
          resetFields={handleReset}
          submitForm={handleSubmit}
        />
      )}
      {!editingNewPassword ? (
        <UserVariableRow
          title="Salasana"
          content={'**********'}
          handleEditButtonClick={changeNewPasswordEditingStatus}
        />
      ) : (
        <NewPasswordRow
          disableSaving={!dirty}
          errors={errors}
          changeEditingStatus={changeNewPasswordEditingStatus}
          resetFields={handleReset}
          submitForm={handleSubmit}
        />
      )}
    </Form>
  );
};
