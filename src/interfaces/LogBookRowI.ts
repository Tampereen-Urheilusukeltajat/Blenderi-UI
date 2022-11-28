import EventRow from './EventRow';

type LogbookRowI = {
  id: number;
  eventRow: EventRow;
  onDelete: (id: number) => void;
};

export default LogbookRowI;
