import LogBookHistory from '../components/LogBookHistory';
import LogBookNewEvent from '../components/LogBookNewEvent';
import '../styles/logbook/LogBook.css';

const LogBook = () => {
  return (
    <div>
      <h2 className="mb-5">Täyttöpäiväkirja</h2>
      <div id="logBookNewEvent" className="mb-5 p-5">
        <LogBookNewEvent />
      </div>
      <LogBookHistory />
    </div>
  );
};

export default LogBook;
