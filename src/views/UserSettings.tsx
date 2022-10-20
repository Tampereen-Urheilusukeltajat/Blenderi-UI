import { DivingSetSettings } from '../components/UserSettings/DivingSetSettings';
import { UserSettings } from '../components/UserSettings/UserSettings';

export const User = (): JSX.Element => {
  return (
    <div>
      <UserSettings />
      <DivingSetSettings />
    </div>
  );
};
