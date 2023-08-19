import { useFillEventQuery } from '../../lib/queries/FillEventQuery';
import { FillEvent } from '../../interfaces/FillEvent';
import { formatEurCentsToEur } from '../../lib/utils';

const FillEventRow = ({
  data,
  index,
}: {
  data: FillEvent;
  index: number;
}): JSX.Element => {
  return (
    <tr className={index % 2 === 0 ? 'evenRow' : 'oddRow'}>
      <td>{data.createdAt}</td>
      <td>{data.cylinderSetName}</td>
      <td>{data.gasMixture}</td>
      <td>{data.description}</td>
      <td>{formatEurCentsToEur(data.price)}</td>
    </tr>
  );
};

export const ListFillEvents = (): JSX.Element => {
  const fillEvents: FillEvent[] = useFillEventQuery().data ?? [];

  return (
    <div>
      <div className="d-flex flex-row justify-content-between">
        <h1 className="pb-4">Täyttöhistoria</h1>
        <div className="d-flex flex-column align-items-center">
          <h2>Täyttöjen hinta yhteensä</h2>
          <h3>
            {formatEurCentsToEur(
              fillEvents.reduce((acc, fillEvent) => acc + fillEvent.price, 0)
            )}{' '}
            €
          </h3>
        </div>
      </div>
      <table className="table">
        <thead className="tableHead">
          <tr>
            <th>Päivämäärä</th>
            <th>pullosetti</th>
            <th>kaasuseos</th>
            <th>lisätiedot</th>
            <th>hinta (€)</th>
          </tr>
        </thead>
        <tbody>
          {fillEvents.map((fillEvent, index) => (
            <FillEventRow key={fillEvent.id} data={fillEvent} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
