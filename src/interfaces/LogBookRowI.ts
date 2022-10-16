import EventRow from "./EventRow";

interface LogBookRowI {
    id: number;
    eventRow: EventRow;
    onDelete: (id: number) => void;
  }

export default LogBookRowI;