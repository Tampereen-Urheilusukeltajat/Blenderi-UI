import { UserManagementTable } from '../components/UserManagementTable';
import { Button } from 'react-bootstrap';
import '../styles/UserManagement/UserManagement.css';

// TODO: Hae käyttäjät API:sta
// TODO: Tee dialogi muutosten tallentamiselle
// TODO: Tee dialogi muutosten tekemiselle
// TODO: Toteuta historian näyttäminen
// TODO: Toteuta poisto nappula
const UserManagement = (): JSX.Element => {
  return (
    <div id="userManagementRoot">
      <h1 id="userHeading">Käyttäjät</h1>
      <UserManagementTable />
      <div>
        <Button id="saveChangesBtn">Tallenna muutokset</Button>
        <Button id="cancelChangesBtn">Hylkää muutokset</Button>
      </div>
    </div>
  );
};

export default UserManagement;
