import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';

const LogBookNewEvent = () => {
  return (
    <div>
      <h3 className="mb-5">Uusi täyttötapahtuma</h3>
      <Form>
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
            <Button className="removeRowButton">Poista rivi</Button>
          </Form.Group>
        </Row>
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
            <Button className="removeRowButton">Poista rivi</Button>
          </Form.Group>
        </Row>
        <Button className="addNewRowButton mt-5">Lisää uusi rivi</Button>

        <div className="mt-5">
          <Button className="formButton">Tallenna</Button>
          <Button className="formButton">Peruuta</Button>
        </div>
      </Form>
    </div>
  );
};

export default LogBookNewEvent;
