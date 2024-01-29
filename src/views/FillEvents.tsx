import { ListFillEvents } from '../components/FillEvents/ListFillEvents';
import { useFillEventQuery } from '../lib/queries/FillEventQuery';

export const FillEvents = (): JSX.Element => {
  const { data: fillEvents } = useFillEventQuery();
  return <ListFillEvents fillEvents={fillEvents ?? []} />;
};
