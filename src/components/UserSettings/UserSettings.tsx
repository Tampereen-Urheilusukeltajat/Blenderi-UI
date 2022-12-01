import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Field, Form, Formik } from 'formik';
import React, { useCallback, useMemo, useState } from 'react';
import { patchUser } from '../../lib/apiRequests/userRequests';
import { USER_QUERY_KEY } from '../../lib/queries/queryKeys';
import { useUserQuery } from '../../lib/queries/userQuery';
import {
  getChangedFieldValues,
  getUserIdFromAccessToken,
} from '../../lib/utils';
import '../../styles/user/user.css';
import { ButtonType, PrimaryButton, SecondaryButton } from '../common/Buttons';

type UserPropertiesFormProps = {
  dirty: boolean;
  handleSubmit: () => void;
  handleReset: () => void;
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

type EditableUserVariableRowProps = {
  title: string;
  fieldNames: string[];
  disableSaving: boolean;
  changeEditingStatus: () => void;
  resetFields: () => void;
  submitForm: () => void;
  hideInput?: boolean;
  requirePassword?: boolean;
};

type NewPasswordRowProps = {
  disableSaving: boolean;
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
  fieldNames,
  title,
  changeEditingStatus,
  resetFields,
  requirePassword,
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
        <span className="title">{title}</span>
        {fieldNames.map((fieldName) => (
          <Field
            key={fieldName}
            className="form-control"
            name={fieldName}
            type="text"
          />
        ))}

        {requirePassword ?? false ? (
          <>
            <span className="title">Nykyinen salasana</span>
            <Field
              autoComplete="current-password"
              type="password"
              className="form-control"
              name="password"
            />
          </>
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
        <span className="title">Nykyinen salasana</span>
        <Field
          autoComplete="current-password"
          className="form-control"
          name="password"
          type="password"
        />
        <span className="title">Uusi salasana</span>
        <Field
          autoComplete="new-password"
          className="form-control"
          name="newPassword"
          type="password"
        />
        <span className="title">Uusi salasana uudestaan</span>
        <Field
          autoComplete="new-password"
          className="form-control"
          name="newPasswordAgain"
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
  handleReset,
  handleSubmit,
  values,
}) => {
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPhone, setEditingPhone] = useState(false);
  const [editingNewPassword, setEditingNewPassword] = useState(false);

  const changeNameEditingStatus = useCallback(() => {
    setEditingName(!editingName);

    // Set all other fields to false and reset form
    handleReset();
    setEditingEmail(false);
    setEditingPhone(false);
    setEditingNewPassword(false);
  }, [editingName, handleReset]);

  const changeEmailEditingStatus = useCallback(() => {
    setEditingEmail(!editingEmail);

    // Set all other fields to false and reset form
    handleReset();
    setEditingName(false);
    setEditingPhone(false);
    setEditingNewPassword(false);
  }, [editingEmail, handleReset]);

  const changePhoneEditingStatus = useCallback(() => {
    setEditingPhone(!editingPhone);

    // Set all other fields to false and reset form
    handleReset();
    setEditingName(false);
    setEditingEmail(false);
    setEditingNewPassword(false);
  }, [editingPhone, handleReset]);

  const changeNewPasswordEditingStatus = useCallback(() => {
    setEditingNewPassword(!editingNewPassword);

    // Set all other fields to false and reset form
    handleReset();
    setEditingName(false);
    setEditingEmail(false);
    setEditingPhone(false);
  }, [editingNewPassword, handleReset]);

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
          fieldNames={['forename', 'surname']}
          title="Etu- ja sukunimi"
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
          fieldNames={['email']}
          title="Sähköposti"
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
          fieldNames={['phone']}
          title="Puhelinnumero"
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

  const userMutation = useMutation({
    mutationFn: async (payload: Partial<FormUser>) =>
      patchUser(userId, payload),
    mutationKey: USER_QUERY_KEY(userId),
    onSuccess: (user) => {
      queryClient.setQueryData(USER_QUERY_KEY(userId), user);
    },
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
            onSubmit={handleFormSubmit}
          >
            {({ values, handleReset, handleSubmit, dirty }) => (
              <UserPropertiesForm
                dirty={dirty}
                handleReset={handleReset}
                handleSubmit={handleSubmit}
                values={values}
              />
            )}
          </Formik>
        ) : null}
      </div>
    </div>
  );
};
