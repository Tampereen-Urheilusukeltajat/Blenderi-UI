import EventRow from './EventRow';
import LogBookHistoryRowI from './LogBookHistoryRowI';

type LogBookNewEventProps = {
  events: EventRow[];
  handleAdd: () => void;
  handleDelete: (rowId: number) => void;
  handleReset: () => void;
  historyRows: LogBookHistoryRowI[];
  setHistoryRows: React.Dispatch<React.SetStateAction<LogBookHistoryRowI[]>>;
};

export default LogBookNewEventProps;
