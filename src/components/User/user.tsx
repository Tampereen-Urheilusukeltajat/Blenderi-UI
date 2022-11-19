import { Field, Form, Formik } from 'formik';
import React, { useCallback, useState } from 'react';
import '../../styles/user/user.css';
import { ButtonType, PrimaryButton, SecondaryButton } from '../common/Buttons';

type UserPropertiesFormProps = {
  handleSubmit: () => void;
  handleReset: () => void;
  values: FormUser;
};

type FormUser = {
  firstName: string;
  surname: string;
  email: string;
  phoneNumber: string;
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
  changeEditingStatus: () => void;
  resetFields: () => void;
  submitForm: () => void;
  hideInput?: boolean;
  requirePassword?: boolean;
};

type NewPasswordRowProps = {
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
    <div className="flexRow">
      <div className="flexColumn">
        <span className="title">{title}</span>
        <span className="content">{content}</span>
      </div>
      <PrimaryButton onClick={handleEditButtonClick} text="Muokkaa" />
    </div>
  );
};

const EditableUserVariableRow: React.FC<EditableUserVariableRowProps> = ({
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
    changeEditingStatus();
    submitForm();
  }, [changeEditingStatus, submitForm]);

  return (
    <div className="flexRow">
      <div className="flexColumn">
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
        <PrimaryButton onClick={handleSubmitButtonClick} text="Tallenna" />
        <SecondaryButton onClick={handleCancelButtonClick} text="Peruuta" />
      </div>
    </div>
  );
};

const NewPasswordRow: React.FC<NewPasswordRowProps> = ({
  changeEditingStatus,
  resetFields,
  submitForm,
}) => {
  const handleCancelButtonClick = useCallback(() => {
    changeEditingStatus();
    resetFields();
  }, [changeEditingStatus, resetFields]);

  const handleSubmitButtonClick = useCallback(() => {
    changeEditingStatus();
    submitForm();
  }, [changeEditingStatus, submitForm]);

  return (
    <div className="flexRow">
      <div className="flexColumn">
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
  handleReset,
  handleSubmit,
  values,
}) => {
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPhoneNumber, setEditingPhoneNumber] = useState(false);
  const [editingNewPassword, setEditingNewPassword] = useState(false);

  const changeNameEditingStatus = useCallback(() => {
    setEditingName(!editingName);

    // Set all other fields to false and reset form
    handleReset();
    setEditingEmail(false);
    setEditingPhoneNumber(false);
    setEditingNewPassword(false);
  }, [editingName, handleReset]);

  const changeEmailEditingStatus = useCallback(() => {
    setEditingEmail(!editingEmail);

    // Set all other fields to false and reset form
    handleReset();
    setEditingName(false);
    setEditingPhoneNumber(false);
    setEditingNewPassword(false);
  }, [editingEmail, handleReset]);

  const changePhoneEditingStatus = useCallback(() => {
    setEditingPhoneNumber(!editingPhoneNumber);

    // Set all other fields to false and reset form
    handleReset();
    setEditingName(false);
    setEditingEmail(false);
    setEditingNewPassword(false);
  }, [editingPhoneNumber, handleReset]);

  const changeNewPasswordEditingStatus = useCallback(() => {
    setEditingNewPassword(!editingNewPassword);

    // Set all other fields to false and reset form
    handleReset();
    setEditingName(false);
    setEditingEmail(false);
    setEditingPhoneNumber(false);
  }, [editingNewPassword, handleReset]);

  return (
    <Form>
      {!editingName ? (
        <UserVariableRow
          title="Nimi"
          content={`${values.firstName} ${values.surname}`}
          handleEditButtonClick={changeNameEditingStatus}
        />
      ) : (
        <EditableUserVariableRow
          fieldNames={['firstName', 'surname']}
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
          fieldNames={['email']}
          title="Sähköposti"
          changeEditingStatus={changeEmailEditingStatus}
          resetFields={handleReset}
          requirePassword
          submitForm={handleSubmit}
        />
      )}
      {!editingPhoneNumber ? (
        <UserVariableRow
          title="Puhelinnumero"
          content={values.phoneNumber}
          handleEditButtonClick={changePhoneEditingStatus}
        />
      ) : (
        <EditableUserVariableRow
          fieldNames={['phoneNumber']}
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
          changeEditingStatus={changeNewPasswordEditingStatus}
          resetFields={handleReset}
          submitForm={handleSubmit}
        />
      )}
    </Form>
  );
};

export const User: React.FC = () => {
  const handleFormSubmit = useCallback(() => {
    // TODO send updates to backend
    // TODO make sure new password fields are matching
  }, []);

  return (
    <div className="wrapper">
      <div className="blueBackground userSettings">
        <Formik
          initialValues={{
            firstName: 'Seppo',
            surname: 'Sukeltaja',
            email: 'seppo.sukeltaja@taursu.fi',
            phoneNumber: '+358501112233',
            password: '',
            newPassword: '',
            newPasswordAgain: '',
          }}
          onSubmit={handleFormSubmit}
        >
          {({ values, handleReset, handleSubmit }) => (
            <UserPropertiesForm
              handleReset={handleReset}
              handleSubmit={handleSubmit}
              values={values}
            />
          )}
        </Formik>
      </div>
    </div>
  );
};
