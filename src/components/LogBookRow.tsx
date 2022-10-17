import { FC, useCallback } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import LogBookRowI from '../interfaces/LogBookRowI';

const LogBookRow: FC<LogBookRowI> = (props): JSX.Element => {
  const handleCylinderChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      props.eventRow.divingCylinder = e.target.value;
    },
    []
  );

  const handleGasChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      props.eventRow.gas = e.target.value;
    },
    []
  );

  const handlePressureChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      props.eventRow.pressure = Number(e.target.value);
    },
    []
  );

  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      props.eventRow.additionalInformation = e.target.value;
    },
    []
  );

  return (
    <Row className="mt-2">
      <Form.Group as={Col}>
        <Form.Select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleCylinderChange(e)
          }
          defaultValue="Valitse pullo"
        >
          <option>Valitse pullo</option>
          <option>...</option>
        </Form.Select>
      </Form.Group>
      <Form.Group as={Col}>
        <Form.Select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleGasChange(e)
          }
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handlePressureChange(e)
          }
          defaultValue={0}
          min={0}
        />
        <InputGroup.Text>bar</InputGroup.Text>
      </InputGroup>
      <Form.Group as={Col}>
        <Form.Control
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleDescriptionChange(e)
          }
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

export default LogBookRow;
