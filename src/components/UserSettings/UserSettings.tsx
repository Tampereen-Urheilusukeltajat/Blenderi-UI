import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import React, { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { patchUser } from '../../lib/apiRequests/userRequests';
import { USER_QUERY_KEY } from '../../lib/queries/queryKeys';
import { useUserQuery } from '../../lib/queries/userQuery';
import {
  getChangedFieldValues,
  getUserIdFromAccessToken,
} from '../../lib/utils';
import '../../styles/user/user.css';
import { ButtonType, PrimaryButton, SecondaryButton } from '../common/Buttons';
import { TextInput } from '../common/Inputs';
import { USER_SETTINGS_VALIDATION_SCHEMA } from './validation';

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

export type FormUser = {
  forename: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
  newPassword: string;
  newPasswordAgain: string;
};

type UserVariableRowProps = {
  title: string;
  content: string;
  handleEditButtonClick: () => void;
};

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
    <div className="userFlexRow">
      <div className="userFlexColumn">
        <span className="title">{title}</span>
        <span className="content">{content}</span>
      </div>
      <PrimaryButton onClick={handleEditButtonClick} text="Muokkaa" />
    </div>
  );
};

const EditableUserVariableRow: React.FC<EditableUserVariableRowProps> = ({
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
    <div className="userFlexRow">
      <div className="userFlexColumn">
        {fields.map(({ label, fieldName }) => (
          <TextInput
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
      <div className="editButtons">
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
    <div className="userFlexRow">
      <div className="userFlexColumn">
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
        <TextInput
          autoComplete="new-password"
          errorText={errors.newPassword}
          name="newPassword"
          label="Uusi salasana"
          type="password"
        />
        <TextInput
          autoComplete="new-password"
          errorText={errors.newPasswordAgain}
          name="newPasswordAgain"
          label="Uusi salasana uudestaan"
          type="password"
        />
      </div>
      <div className="editButtons">
        <PrimaryButton
          disabled={disableSaving}
          className="primaryButton"
          onClick={handleSubmitButtonClick}
          text="Tallenna"
          type={ButtonType.submit}
        />
        <PrimaryButton
          className="secondaryButton btn-secondary"
          onClick={handleCancelButtonClick}
          text="Peruuta"
        />
      </div>
    </div>
  );
};

const UserPropertiesForm: React.FC<UserPropertiesFormProps> = ({
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
          content={values.phone}
          handleEditButtonClick={changePhoneEditingStatus}
        />
      ) : (
        <EditableUserVariableRow
          disableSaving={!dirty}
          errors={errors}
          fields={[{ fieldName: 'phone', label: 'Puhelinnumero' }]}
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

export const UserSettings: React.FC = () => {
  const queryClient = useQueryClient();

  const userId = useMemo(() => getUserIdFromAccessToken(), []);
  const { data: user } = useUserQuery(userId);

  // Used to open and close editing panel for field
  // Only one can be open at the same time
  // TODO Refactor to something smarter
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPhone, setEditingPhone] = useState(false);
  const [editingNewPassword, setEditingNewPassword] = useState(false);

  const userMutation = useMutation({
    mutationFn: async (payload: Partial<FormUser>) =>
      patchUser(userId, payload),
    mutationKey: USER_QUERY_KEY(userId),
    onSuccess: (user) => {
      queryClient.setQueryData(USER_QUERY_KEY(userId), user);
      toast.success('Tiedot päivitetty!');

      setEditingName(false);
      setEditingEmail(false);
      setEditingPhone(false);
      setEditingNewPassword(false);
    },
    onError: () => {
      toast.error('Tietojen päivitys epäonnistui. Yritä uudelleen.');
    },
    retry: 0,
  });

  const handleFormSubmit = useCallback(
    (fields: Partial<FormUser>) => {
      if (!user) throw new Error('User not defined when updating');
      const changedValues: Partial<FormUser> = getChangedFieldValues(
        {
          email: user.email,
          forename: user.forename,
          phone: user.phone,
          surname: user.surname,
          password: '',
          newPassword: '',
          newPasswordAgain: '',
        },
        fields
      );

      userMutation.mutate(changedValues);
    },
    [userMutation, user]
  );

  return (
    <div className="wrapper">
      <div className="blueBackground userSettings">
        {user ? (
          <Formik
            initialValues={{
              forename: user.forename,
              surname: user.surname,
              email: user.email,
              phone: user.phone,
              password: '',
              newPassword: '',
              newPasswordAgain: '',
            }}
            validationSchema={USER_SETTINGS_VALIDATION_SCHEMA}
            enableReinitialize={true}
            onSubmit={handleFormSubmit}
          >
            {({ values, errors, handleReset, handleSubmit, dirty }) => (
              <UserPropertiesForm
                dirty={dirty}
                editingEmail={editingEmail}
                editingName={editingName}
                editingNewPassword={editingNewPassword}
                editingPhone={editingPhone}
                errors={errors}
                handleReset={handleReset}
                handleSubmit={handleSubmit}
                setEditingEmail={setEditingEmail}
                setEditingName={setEditingName}
                setEditingNewPassword={setEditingNewPassword}
                setEditingPhone={setEditingPhone}
                values={values}
              />
            )}
          </Formik>
        ) : null}
      </div>
    </div>
  );
};
