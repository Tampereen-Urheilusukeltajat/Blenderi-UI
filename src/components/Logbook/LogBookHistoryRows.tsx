import { FC } from 'react';
import LogBookHistoryRowsProps from '../../interfaces/LogBookHistoryRowsProps';
import LogBookHistoryRowComp from './LogBookHistoryRow';

const LogBookHistoryRows: FC<LogBookHistoryRowsProps> = (
  props
): JSX.Element => {
  return (
    <tbody>
      {props.historyRows.map((row, i) => (
        <LogBookHistoryRowComp key={i} historyRow={row} />
      ))}
    </tbody>
  );
};

export default LogBookHistoryRows;
