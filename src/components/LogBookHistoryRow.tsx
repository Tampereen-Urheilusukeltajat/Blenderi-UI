import { FC } from 'react';
import LogBookHistoryRow from '../interfaces/LogBookHistoryRow';

const LogBookHistoryRowComp: FC<LogBookHistoryRow> = (props) => {
  return (
    <tr>
      <td>{props.historyRow.divingCylinder}</td>
      <td>
        {props.historyRow.compressedAir != null
          ? props.historyRow.compressedAir
          : 0}{' '}
        bar
      </td>
      <td>
        {props.historyRow.oxygen != null ? props.historyRow.oxygen : 0} bar
      </td>
      <td>
        {props.historyRow.helium != null ? props.historyRow.helium : 0} bar
      </td>
      <td>{props.historyRow.argon != null ? props.historyRow.argon : 0} bar</td>
      <td>
        {props.historyRow.additionalInformation != null
          ? props.historyRow.additionalInformation
          : '-'}
      </td>
      <td>{props.historyRow.price} &euro;</td>
      <td>{props.historyRow.date.toLocaleDateString('fi-FI')}</td>
    </tr>
  );
};

export default LogBookHistoryRowComp;
