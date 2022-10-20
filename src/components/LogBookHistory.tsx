import { FC } from 'react';
import Table from 'react-bootstrap/Table';
import LogBookHistoryRowsProps from '../interfaces/LogBookHistoryRowsProps';
import LogBookHistoryRows from './LogBookHistoryRows';

const LogBookHistory: FC<LogBookHistoryRowsProps> = (props): JSX.Element => {
  return (
    <div>
      <h3 className="mb-5">Historia</h3>
      <Table className="table-borderless">
        <thead>
          <tr>
            <th>Pullo</th>
            <th>Paineilma</th>
            <th>Happi</th>
            <th>Helium</th>
            <th>Argon</th>
            <th>Lisätiedot</th>
            <th>Hinta</th>
            <th>Pvm</th>
          </tr>
        </thead>
        <LogBookHistoryRows historyRows={props.historyRows} />
      </Table>
    </div>
  );
};

export default LogBookHistory;
