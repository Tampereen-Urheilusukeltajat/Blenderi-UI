import { EventRow } from './EventRow';

export type LogbookRowI = {
  id: number;
  eventRow: EventRow;
  onDelete: (id: number) => void;
};
