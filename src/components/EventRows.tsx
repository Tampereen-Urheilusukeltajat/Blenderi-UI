import { FC } from 'react';
import EventRowsI from '../interfaces/EventRowsI';
import LogBookRow from './LogBookRow';

const EventRows: FC<EventRowsI> = (props): JSX.Element => {
  return (
    <div>
      {props.events.map((event) => (
        <LogBookRow
          id={event._id}
          key={event._id}
          eventRow={props.events[event._id]}
          onDelete={props.handleDelete}
        />
      ))}
    </div>
  )
}

export default EventRows;
