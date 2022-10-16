import { Col, Form, Row } from 'react-bootstrap';

const LogBookFieldRow = (): JSX.Element => {
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

export default LogBookFieldRow;
