import { FC } from 'react';
import EventRowsI from '../interfaces/EventRowsI';
import LogBookRow from './LogBookRow';

const EventRows: FC<EventRowsI> = (props): JSX.Element => {
  return (
    <div>
      {props.events.map((x) => (
        <LogBookRow
          key={x._id}
          id={x._id}
          eventRow={props.events[x._id]}
          onDelete={props.handleDelete}
        />
      ))}
    </div>
  );
};

export default EventRows;
