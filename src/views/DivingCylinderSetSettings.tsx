import { DivingCylinderSetList } from '../components/DivingCylinderSet/DivingCylinderSetList';
import { NewDivingCylinderSet } from '../components/DivingCylinderSet/newDivingCylinderSet';
import '../styles/divingCylinderSet/divingCylinderSet.css';

export const DivingCylinderSetManagement = (): JSX.Element => {
  return (
    <div>
      <DivingCylinderSetList />
      <NewDivingCylinderSet />
    </div>
  );
};
