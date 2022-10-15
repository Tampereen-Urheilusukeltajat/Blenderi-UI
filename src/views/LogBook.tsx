import { useState } from 'react';
import LogBookHistory from '../components/LogBookHistory';
import LogBookNewEvent from '../components/LogBookNewEvent';
import '../styles/logbook/LogBook.css';

export interface EventRow {
  _id: number; // Tarvitaan rivien poistoa ja lisäämistä varten
  pullo: string;
  kaasu: string;
  tayttopaine: number;
  lisatiedot?: string;
}

export interface LogBookHistoryRowI {
  pullo: string;
  paineilma?: number;
  happi?: number;
  helium?: number;
  argon?: number;
  lisatiedot?: string;
  hinta: number;
  pvm: Date;
}

export interface LogBookHistoryRowsProps {
  historyRows: LogBookHistoryRowI[];
}

const LogBook = (): JSX.Element => {
  const [events, setEvents] = useState<EventRow[]>([]);
  const [historyRows, setHistoryRows] = useState<LogBookHistoryRowI[]>([]);

  const handleAdd = () => {
    const newEvents = [...events];
    newEvents.push({ _id: events.length } as EventRow);
    setEvents(newEvents);
  };

  const handleDelete = (rowId: number) => {
    const newEvents = events.filter((ev) => ev._id !== rowId);
    setEvents(newEvents);
  };

  const handleReset = () => {
    setEvents([]);
  };

  return (
    <div>
      <h2 className="mb-5">Täyttöpäiväkirja</h2>
      <div id="logBookNewEvent" className="mb-5 p-5">
        <LogBookNewEvent
          events={events}
          handleAdd={handleAdd}
          handleDelete={handleDelete}
          handleReset={handleReset}
          historyRows={historyRows}
          setHistoryRows={setHistoryRows}
        />
      </div>
      <LogBookHistory historyRows={historyRows} />
    </div>
  );
};

export default LogBook;
