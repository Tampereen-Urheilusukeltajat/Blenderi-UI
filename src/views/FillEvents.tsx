import { ListFillEvents } from '../components/FillEvents/ListFillEvents';
import { useFillEventQuery } from '../lib/queries/fillEventQuery';

export const FillEvents = (): JSX.Element => {
  const { data: fillEvents } = useFillEventQuery();
  return <ListFillEvents fillEvents={fillEvents ?? []} />;
};
