import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { Formik, FormikHelpers } from 'formik';
import { FC } from 'react';
import LogBookNewEventProps from '../interfaces/LogBookEventProps';
import LogBookFieldRow from './LogBookFieldRow';
import EventRows from './EventRows';
import LogBookHistoryRowI from '../interfaces/LogBookHistoryRowI';
import EventRow from '../interfaces/EventRow';

const LogBookNewEvent: FC<LogBookNewEventProps> = (props): JSX.Element => {
  // Formik does not support useCallback
  const handleFormSubmit = (
    values: EventRow[],
    actions: FormikHelpers<EventRow[]>
  ) => {
    props.events.forEach((x) => values.push(x));
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
  };

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
            handleFormSubmit(values, actions);
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
