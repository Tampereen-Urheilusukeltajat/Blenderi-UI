import { EventRow } from './EventRow';
import { LogbookHistoryRowI } from './LogBookHistoryRowI';
import React from 'react';

export type LogbookNewEventProps = {
  events: EventRow[];
  handleAdd: () => void;
  handleDelete: (rowId: number) => void;
  handleReset: () => void;
  historyRows: LogbookHistoryRowI[];
  setHistoryRows: React.Dispatch<React.SetStateAction<LogbookHistoryRowI[]>>;
};
