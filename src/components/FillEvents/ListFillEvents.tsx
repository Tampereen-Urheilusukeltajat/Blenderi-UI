import { useFillEventQuery } from '../../lib/queries/FillEventQuery';
import FillEvent from '../../interfaces/FillEvent';

function FillEventRow ({ data, index }: { data: FillEvent, index: number }): JSX.Element {
  return <tr
      className={index % 2 === 0 ? 'evenRow' : 'oddRow'}
  >
    <td>{data.createdAt}</td>
    <td>{data.cylinderSetName}</td>
    <td>{data.gasMixture}</td>
    <td>{data.description}</td>
    <td>{data.price}</td>
  </tr>;
}

export const ListFillEvents = (): JSX.Element => {
  const fillEvents: FillEvent[] = useFillEventQuery().data ?? [];

  return (
    <div>
      <h1 className="pb-4">Täyttötapahtumat</h1>
      <table className="table">
        <thead className="tableHead">
          <tr>
            <th>
              Päivämäärä
            </th>
            <th>
              pullosetti
            </th>
            <th>
              kaasuseos
            </th>
            <th>
              lisätiedot
            </th>
            <th>
              hinta (€)
            </th>
          </tr>
        </thead>
        <tbody>
          {fillEvents.map((fillEvent, index) =>
              <FillEventRow
                  key={fillEvent.id}
                  data={fillEvent}
                  index={index}
              />
          )}
        </tbody>
      </table>
    </div>
  );
};
