import EventRow from './EventRow';

type EventRowsI = {
  events: EventRow[];
  handleDelete: (rowId: number) => void;
};

export default EventRowsI;
