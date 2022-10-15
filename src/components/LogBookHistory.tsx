import { FC, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { LogBookHistoryRowI, LogBookHistoryRowsProps } from '../views/LogBook';

interface LogBookHistoryRow {
  historyRow: LogBookHistoryRowI;
}

const LogBookHistoryRow: FC<LogBookHistoryRow> = (props) => {
  return (
    <tr>
      <td>{props.historyRow.pullo}</td>
      <td>{props.historyRow.paineilma ? props.historyRow.paineilma : 0} bar</td>
      <td>{props.historyRow.happi ? props.historyRow.happi : 0} bar</td>
      <td>{props.historyRow.helium ? props.historyRow.helium : 0} bar</td>
      <td>{props.historyRow.argon ? props.historyRow.argon : 0} bar</td>
      <td>{props.historyRow.lisatiedot ? props.historyRow.lisatiedot : '-'}</td>
      <td>{props.historyRow.hinta} &euro;</td>
      <td>{props.historyRow.pvm.toLocaleDateString('fi-FI')}</td>
    </tr>
  );
};

const LogBookHistoryRows: FC<LogBookHistoryRowsProps> = (
  props
): JSX.Element => {
  return (
    <tbody>
      {props.historyRows.map((row, i) => (
        <LogBookHistoryRow key={i} historyRow={row} />
      ))}
    </tbody>
  );
};

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
