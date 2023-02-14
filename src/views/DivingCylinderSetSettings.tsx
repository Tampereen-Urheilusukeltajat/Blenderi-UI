import { DivingCylinderSetList } from '../components/DivingCylinderSet/DivingCylinderSetList';
import { NewDivingCylinderSet } from '../components/DivingCylinderSet/NewDivingCylinderSet';

export const DivingCylinderSetManagement = (): JSX.Element => {
  return (
    <div>
      <DivingCylinderSetList />
      <NewDivingCylinderSet />
    </div>
  );
};
