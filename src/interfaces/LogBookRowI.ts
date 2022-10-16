import EventRow from './EventRow';

type LogBookRowI = {
  id: number;
  eventRow: EventRow;
  onDelete: (id: number) => void;
};

export default LogBookRowI;
