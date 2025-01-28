import { Formik } from 'formik';
import React, { useCallback, useMemo, useState } from 'react';
import { useUserQuery } from '../../lib/queries/userQuery';
import {
  getChangedFieldValues,
  getUserIdFromAccessToken,
} from '../../lib/utils';
import { USER_SETTINGS_VALIDATION_SCHEMA } from './validation';
import { UserPropertiesForm } from './components/UserPropertiesForm';
import styles from './UserSettings.module.scss';
import { useUserMutation } from '../../lib/queries/userMutations';

export type FormUser = {
  forename: string;
  surname: string;
  email: string;
  phoneNumber: string;
  password: string;
  newPassword: string;
  newPasswordAgain: string;
};

export type PatchUser = {
  email: string;
  phoneNumber: string;
  forename: string;
  surname: string;
  password: string;
  currentPassword: string;
  archive: boolean;
};

export const UserSettings: React.FC = () => {
  const userId = useMemo(() => getUserIdFromAccessToken(), []);
  const { data: user } = useUserQuery(userId);
  const { mutate: updateUser } = useUserMutation(() => {
    setEditingName(false);
    setEditingEmail(false);
    setEditingPhone(false);
    setEditingNewPassword(false);
  });

  // Used to open and close editing panel for field
  // Only one can be open at the same time
  // TODO Refactor to something smarter
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPhone, setEditingPhone] = useState(false);
  const [editingNewPassword, setEditingNewPassword] = useState(false);

  const handleFormSubmit = useCallback(
    (fields: Partial<FormUser>) => {
      if (!user) throw new Error('User not defined when updating');
      const changedValues: Partial<FormUser> = getChangedFieldValues(
        {
          email: user.email.trim(),
          forename: user.forename.trim(),
          phoneNumber: user.phoneNumber.replaceAll(' ', ''),
          surname: user.surname.trim(),
          password: '',
          newPassword: '',
          newPasswordAgain: '',
        },
        {
          email: fields.email?.trim(),
          forename: fields.forename?.trim(),
          phoneNumber: fields.phoneNumber?.replaceAll(' ', ''),
          surname: fields.surname?.trim(),
          password: fields.password,
          newPassword: fields.newPassword,
          newPasswordAgain: fields.newPasswordAgain,
        },
      );

      updateUser({
        userId: user.id,
        payload: {
          email: changedValues.email,
          phoneNumber: changedValues.phoneNumber,
          forename: changedValues.forename,
          surname: changedValues.surname,
          password: changedValues.newPassword,
          currentPassword: changedValues.password,
        },
      });
    },
    [updateUser, user],
  );

  return (
    <div className={styles.content}>
      {user ? (
        <Formik
          initialValues={{
            forename: user.forename,
            surname: user.surname,
            email: user.email,
            phoneNumber: user.phoneNumber,
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
  );
};
