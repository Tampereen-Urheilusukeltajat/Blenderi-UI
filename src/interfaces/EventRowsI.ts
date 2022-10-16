import EventRow from "./EventRow";

interface EventRowsI {
  events: EventRow[];
  handleDelete: (rowId: number) => void;
}

export default EventRowsI;