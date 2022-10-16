import { useCallback, useState } from 'react';
import LogBookHistory from '../components/LogBookHistory';
import LogBookNewEvent from '../components/LogBookNewEvent';
import EventRow from '../interfaces/EventRow';
import LogBookHistoryRowI from '../interfaces/LogBookHistoryRowI';
import '../styles/logbook/LogBook.css';

const LogBook = (): JSX.Element => {
  const [events, setEvents] = useState<EventRow[]>([]);
  const [historyRows, setHistoryRows] = useState<LogBookHistoryRowI[]>([]);

  const handleAdd = useCallback(() => {
    const newEvents = [...events];
    const c: EventRow = {
      _id: events.length,
      divingCylinder: '',
      gas: '',
      pressure: 0,
    };
    newEvents.push(c);
    setEvents(newEvents);
  }, [events]);

  const handleDelete = useCallback(
    (rowId: number) => {
      const newEvents = events.filter((ev) => ev._id !== rowId);
      setEvents(newEvents);
    },
    [events]
  );

  const handleReset = useCallback(() => {
    setEvents([]);
  }, [events]);

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
