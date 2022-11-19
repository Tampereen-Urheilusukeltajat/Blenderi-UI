/* eslint-disable @typescript-eslint/indent */ // Prettier is acting weird for this file.
import { FC } from 'react';
import { DivingCylinderSetList } from '../components/DivingCylinderSet/DivingCylinderSetList';
import { NewDivingCylinderSet } from '../components/DivingCylinderSet/NewDivingCylinderSet';
import { User } from '../lib/apiRequests/userRequests';
import '../styles/divingCylinderSet/divingCylinderSet.css';

type DivingCylinderSetManagementCompProps = {
  user: User | undefined;
};

export const DivingCylinderSetManagement: FC<
  DivingCylinderSetManagementCompProps
> = (props): JSX.Element => {
  return (
    <div>
      <DivingCylinderSetList />
      <NewDivingCylinderSet />
    </div>
  );
};
