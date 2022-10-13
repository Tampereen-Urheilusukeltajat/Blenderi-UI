import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import { FC, useState } from 'react';

const LogBookFieldRow = () => {
  return (
    <Row>
      <Form.Group as={Col} controlId="pullo">
        <Form.Label>Pullo</Form.Label>
      </Form.Group>
      <Form.Group as={Col} controlId="kaasu">
        <Form.Label>Kaasu</Form.Label>
      </Form.Group>
      <Form.Group as={Col} controlId="kaasu2">
        <Form.Label>Kaasu2 (vapaaehtoinen)</Form.Label>
      </Form.Group>
      <Form.Group as={Col} controlId="kaasu3">
        <Form.Label>Kaasu3 (vapaaehtoinen)</Form.Label>
      </Form.Group>
      <Form.Group as={Col} controlId="tayttopaine">
        <Form.Label>Täyttöpaine</Form.Label>
      </Form.Group>
      <Form.Group as={Col} controlId="lisatiedot">
        <Form.Label>Lisätiedot</Form.Label>
      </Form.Group>
      <Form.Group as={Col} controlId="hinta">
        <Form.Label>Hinta</Form.Label>
      </Form.Group>
      <Form.Group as={Col} controlId="poista"></Form.Group>
    </Row>
  );
};

interface LogBookRowI {
  id: number;
  onDelete: (id: number) => void;
}

const LogBookRow: FC<LogBookRowI> = (props): JSX.Element => {
  return (
    <Row className="mt-2">
      <Form.Group as={Col} controlId="pullo">
        <Form.Select defaultValue="Valitse pullo">
          <option>Valitse pullo</option>
          <option>...</option>
        </Form.Select>
      </Form.Group>
      <Form.Group as={Col} controlId="kaasu">
        <Form.Select defaultValue="Valitse kaasu">
          <option>Valitse kaasu</option>
          <option>...</option>
        </Form.Select>
      </Form.Group>
      <Form.Group as={Col} controlId="kaasu2">
        <Form.Select defaultValue="Valitse kaasu">
          <option>Valitse kaasu</option>
          <option>...</option>
        </Form.Select>
      </Form.Group>
      <Form.Group as={Col} controlId="kaasu3">
        <Form.Select defaultValue="Valitse kaasu">
          <option>Valitse kaasu</option>
          <option>...</option>
        </Form.Select>
      </Form.Group>
      <InputGroup as={Col} controlId="tayttopaine">
        <Form.Control type="number" defaultValue={0} />
        <InputGroup.Text>bar</InputGroup.Text>
      </InputGroup>
      <Form.Group as={Col} controlId="lisatiedot">
        <Form.Control placeholder="" />
      </Form.Group>
      <Form.Group as={Col} controlId="hinta">
        <p>0,00 €</p>
      </Form.Group>
      <Form.Group as={Col} controlId="poista">
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
        <LogBookRow key={x.id} id={x.id} onDelete={props.handleDelete} />
      ))}
    </div>
  );
};

interface EventRow {
  id: number;
  pullo: string;
  kaasu: string;
  kaasu2?: string;
  kaasu3?: string;
  tayttopaine: number;
  lisatiedot?: string;
}

const LogBookNewEvent = () => {
  const [events, setEvents] = useState<EventRow[]>([]);

  const handleAdd = () => {
    const newEvents = [...events];
    newEvents.push({ id: events.length } as EventRow);
    setEvents(newEvents);
  };

  const handleDelete = (rowId: number) => {
    const newEvents = events.filter((ev) => ev.id !== rowId);
    setEvents(newEvents);
  };

  const handleReset = () => {
    setEvents([]);
  };

  return (
    <div>
      <h3 className="mb-5">Uusi täyttötapahtuma</h3>
      <Formik
        initialValues={{}}
        validate={(values) => {
          const errors = {};
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            // TODO: Add backend handling
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <LogBookFieldRow />
            <EventRows events={events} handleDelete={handleDelete} />

            <Button onClick={handleAdd} className="addNewRowButton mt-5">
              Lisää uusi rivi
            </Button>

            <div className="mt-5">
              <Button type="submit" className="formButton">
                Tallenna
              </Button>
              <Button onClick={handleReset} className="formButton">
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
