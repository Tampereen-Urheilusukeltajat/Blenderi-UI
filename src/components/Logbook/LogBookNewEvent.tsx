import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { Formik, FormikHelpers } from 'formik';
import { FC } from 'react';
import LogBookNewEventProps from '../../interfaces/LogBookEventProps';
import LogBookFieldRow from './LogBookFieldRow';
import LogBookHistoryRowI from '../../interfaces/LogBookHistoryRowI';
import EventRow from '../../interfaces/EventRow';
import EventRows from './EventRows';

const LogBookNewEvent: FC<LogBookNewEventProps> = (props): JSX.Element => {
  // Formik does not support useCallback
  const handleFormSubmit = (
    values: EventRow[],
    actions: FormikHelpers<EventRow[]>
  ): void => {
    props.events.forEach((event) => values.push(event));
    if (props.events.length > 0) {
      const newRows = [...props.historyRows];
      values.forEach((value) => {
        const c: LogBookHistoryRowI = {
          divingCylinder: value.divingCylinder,
          price: 0,
          compressedAir: value.gas === 'Paineilma' ? value.pressure : 0,
          oxygen: value.gas === 'Happi' ? value.pressure : 0,
          helium: value.gas === 'Helium' ? value.pressure : 0,
          argon: value.gas === 'Argon' ? value.pressure : 0,
          additionalInformation: value.additionalInformation ?? '-',
          date: new Date(),
        };
        newRows.push(c);
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
        validate={() => {
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
