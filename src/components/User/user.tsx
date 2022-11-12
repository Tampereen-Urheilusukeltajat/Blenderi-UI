import { Field, Form, Formik } from 'formik';
import { useCallback, useState } from 'react';
import { Button } from 'react-bootstrap';
import '../../styles/user/user.css';

type UserProps = Record<string, never>;

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
  hideInput?: boolean;
  requirePassword?: boolean;
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
      <Button
        className="primaryButton"
        onClick={handleEditButtonClick}
        type="button"
      >
        Muokkaa
      </Button>
    </div>
  );
};

const EditableUserVariableRow: React.FC<EditableUserVariableRowProps> = ({
  fieldNames,
  title,
  changeEditingStatus,
  resetFields,
  requirePassword,
  hideInput,
}) => {
  const handleCancelButtonClick = useCallback(() => {
    changeEditingStatus();
    resetFields();
  }, [changeEditingStatus, resetFields]);

  return (
    <div className="flexRow">
      <div className="flexColumn">
        <span className="title">{title}</span>
        {fieldNames.map((fieldName) => (
          <Field
            key={fieldName}
            className="form-control"
            name={fieldName}
            type={hideInput ?? false ? 'password' : 'text'}
          />
        ))}

        {requirePassword ?? false ? (
          <>
            <span className="title">Nykyinen salasana</span>
            <Field type="password" className="form-control" name="password" />
          </>
        ) : null}
      </div>
      <div className="editButtons">
        <Button className="primaryButton" type="submit">
          Tallenna
        </Button>
        <Button
          className="secondaryButton btn-secondary"
          onClick={handleCancelButtonClick}
          type="button"
        >
          Peruuta
        </Button>
      </div>
    </div>
  );
};

export const User: React.FC<UserProps> = () => {
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPhoneNumber, setEditingPhoneNumber] = useState(false);
  const [editingNewPassword, setEditingNewPassword] = useState(false);

  const changeNameEditingStatus = useCallback(() => {
    setEditingName(!editingName);
  }, [editingName]);
  const changeEmailEditingStatus = useCallback(() => {
    setEditingEmail(!editingEmail);
  }, [editingEmail]);
  const changePhoneEditingStatus = useCallback(() => {
    setEditingPhoneNumber(!editingPhoneNumber);
  }, [editingPhoneNumber]);
  const changeEditingNewPasswordStatus = useCallback(() => {
    setEditingNewPassword(!editingNewPassword);
  }, [editingNewPassword]);

  const handleSubmit = useCallback(() => {
    // TODO
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
          }}
          onSubmit={handleSubmit}
        >
          {({ values, resetForm }) => (
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
                  resetFields={resetForm}
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
                  resetFields={resetForm}
                  requirePassword
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
                  resetFields={resetForm}
                />
              )}
              {!editingNewPassword ? (
                <UserVariableRow
                  title="Salasana"
                  content={'**********'}
                  handleEditButtonClick={changeEditingNewPasswordStatus}
                />
              ) : (
                <EditableUserVariableRow
                  fieldNames={['newPassword']}
                  title="Uusi salasana"
                  changeEditingStatus={changeEditingNewPasswordStatus}
                  resetFields={resetForm}
                  requirePassword
                  hideInput
                />
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
