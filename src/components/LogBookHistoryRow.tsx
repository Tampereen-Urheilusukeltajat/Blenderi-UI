import { FC } from 'react';
import LogBookHistoryRow from '../interfaces/LogBookHistoryRow';

const LogBookHistoryRowComp: FC<LogBookHistoryRow> = (props) => {
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

export default LogBookHistoryRowComp;
