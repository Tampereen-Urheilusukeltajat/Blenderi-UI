import { EventRow } from './EventRow';

export type EventRowsI = {
  events: EventRow[];
  handleDelete: (rowId: number) => void;
};
