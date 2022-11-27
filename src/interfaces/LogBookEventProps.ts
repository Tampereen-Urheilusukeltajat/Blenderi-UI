import EventRow from './EventRow';
import LogbookHistoryRowI from './LogBookHistoryRowI';

type LogbookNewEventProps = {
  events: EventRow[];
  handleAdd: () => void;
  handleDelete: (rowId: number) => void;
  handleReset: () => void;
  historyRows: LogbookHistoryRowI[];
  setHistoryRows: React.Dispatch<React.SetStateAction<LogbookHistoryRowI[]>>;
};

export default LogbookNewEventProps;
