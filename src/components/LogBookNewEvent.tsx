import Button from 'react-bootstrap/Button';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import React, { FC } from 'react';
import { EventRow, LogBookHistoryRowI } from '../views/LogBook';

const LogBookFieldRow = () => {
  return (
    <Row>
      <Form.Group as={Col}>
        <Form.Label>Pullo</Form.Label>
      </Form.Group>
      <Form.Group as={Col}>
        <Form.Label>Kaasu</Form.Label>
      </Form.Group>
      <Form.Group as={Col}>
        <Form.Label>Täyttöpaine</Form.Label>
      </Form.Group>
      <Form.Group as={Col}>
        <Form.Label>Lisätiedot</Form.Label>
      </Form.Group>
      <Form.Group as={Col}>
        <Form.Label>Hinta</Form.Label>
      </Form.Group>
      <Form.Group as={Col}></Form.Group>
    </Row>
  );
};

interface LogBookRowI {
  id: number;
  eventRow: EventRow;
  onDelete: (id: number) => void;
}

const LogBookRow: FC<LogBookRowI> = (props): JSX.Element => {
  return (
    <Row className="mt-2">
      <Form.Group as={Col}>
        <Form.Select
          onChange={(e) => (props.eventRow.pullo = e.target.value)}
          defaultValue="Valitse pullo"
        >
          <option>Valitse pullo</option>
          <option>...</option>
        </Form.Select>
      </Form.Group>
      <Form.Group as={Col}>
        <Form.Select
          onChange={(e) => (props.eventRow.kaasu = e.target.value)}
          defaultValue="Valitse kaasu"
        >
          <option>Valitse kaasu</option>
          <option>Paineilma</option>
          <option>Happi</option>
          <option>Helium</option>
          <option>Argon</option>
        </Form.Select>
      </Form.Group>
      <InputGroup as={Col}>
        <Form.Control
          type="number"
          onChange={(e) =>
            (props.eventRow.tayttopaine = Number(e.target.value))
          }
          defaultValue={0}
          min={0}
        />
        <InputGroup.Text>bar</InputGroup.Text>
      </InputGroup>
      <Form.Group as={Col}>
        <Form.Control
          onChange={(e) => (props.eventRow.lisatiedot = e.target.value)}
          placeholder=""
        />
      </Form.Group>
      <Form.Group as={Col}>
        <p>0,00 €</p>
      </Form.Group>
      <Form.Group as={Col}>
        <Button
          onClick={() => props.onDelete(props.id)}
          className="removeRowButton"
        >
          Poista rivi
        </Button>
      </Form.Group>
    </Row>
  );
};

interface EventRowsI {
  events: EventRow[];
  handleDelete: (rowId: number) => void;
}

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

interface LogBookNewEventProps {
  events: EventRow[];
  handleAdd: () => void;
  handleDelete: (rowId: number) => void;
  handleReset: () => void;
  historyRows: LogBookHistoryRowI[];
  setHistoryRows: React.Dispatch<React.SetStateAction<LogBookHistoryRowI[]>>;
}

const LogBookNewEvent: FC<LogBookNewEventProps> = (props): JSX.Element => {
  return (
    <div>
      <h3 className="mb-5">Uusi täyttötapahtuma</h3>
      <Formik
        initialValues={props.events}
        validate={(values) => {
          // TODO: Add validation checks
          const errors = {};
          return errors;
        }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            // TODO: Add backend handling
            values = [];
            props.events.forEach((x) => values.push(x));
            //alert(JSON.stringify(values, null, 2));
            if (props.events.length > 0) {
              const newRows = [...props.historyRows];
              values.map((x) => {
                newRows.push({
                  pullo: x.pullo,
                  hinta: 0,
                  paineilma: x.kaasu === 'Paineilma' ? x.tayttopaine : 0,
                  happi: x.kaasu === 'Happi' ? x.tayttopaine : 0,
                  helium: x.kaasu === 'Helium' ? x.tayttopaine : 0,
                  argon: x.kaasu === 'Argon' ? x.tayttopaine : 0,
                  lisatiedot: x.lisatiedot ? x.lisatiedot : '-',
                  pvm: new Date(),
                } as LogBookHistoryRowI);
              });
              props.setHistoryRows(newRows);
            }
            props.handleReset();
            actions.setSubmitting(false);
          }, 400);
        }}
      >
        {(form) => (
          <Form onSubmit={form.handleSubmit}>
            <LogBookFieldRow />
            <EventRows
              events={props.events}
              handleDelete={props.handleDelete}
            />

            <Button onClick={props.handleAdd} className="addNewRowButton mt-5">
              Lisää uusi rivi
            </Button>

            <div className="mt-5">
              <Button type="submit" className="formButton">
                Tallenna
              </Button>
              <Button onClick={props.handleReset} className="formButton">
                Peruuta
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LogBookNewEvent;
