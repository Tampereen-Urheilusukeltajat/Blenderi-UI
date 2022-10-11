import Table from 'react-bootstrap/Table';

const LogBookHistory = () => {
  return (
    <div>
      <h3 className="mb-5">Historia</h3>
      <Table className="table-borderless">
        <thead>
          <tr>
            <th>Pullo</th>
            <th>Kaasu</th>
            <th>Kaasu2</th>
            <th>Kaasu3</th>
            <th>Täyttöpaine</th>
            <th>Lisätiedot</th>
            <th>Hinta</th>
            <th>Pvm</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Kissa1</td>
            <td>Happi</td>
            <td>-</td>
            <td>-</td>
            <td>40 bar</td>
            <td>-</td>
            <td>5000 €</td>
            <td>19.09.2022</td>
          </tr>
          <tr>
            <td>Kissa2</td>
            <td>Argon</td>
            <td>-</td>
            <td>-</td>
            <td>39 bar</td>
            <td>-</td>
            <td>4999 €</td>
            <td>19.09.2022</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default LogBookHistory;
