import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Formik } from 'formik';
import React, { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { patchUser } from '../../lib/apiRequests/userRequests';
import { USER_QUERY_KEY } from '../../lib/queries/queryKeys';
import { useUserQuery } from '../../lib/queries/userQuery';
import {
  getChangedFieldValues,
  getUserIdFromAccessToken,
} from '../../lib/utils';
import { USER_SETTINGS_VALIDATION_SCHEMA } from './validation';
import { UserPropertiesForm } from './components/UserPropertiesForm';
import styles from './UserSettings.module.scss';

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
    mutationFn: async (payload: Partial<PatchUser>) =>
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

      userMutation.mutate({
        email: changedValues.email,
        phoneNumber: changedValues.phoneNumber,
        forename: changedValues.forename,
        surname: changedValues.surname,
        password: changedValues.newPassword,
        currentPassword: changedValues.password,
      });
    },
    [userMutation, user],
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
