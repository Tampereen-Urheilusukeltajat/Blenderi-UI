import { useQuery } from '@tanstack/react-query';
import { USER_QUERY_KEY } from '../../lib/apiRequests/queryKeys';
import { getUser } from '../../lib/apiRequests/userRequests';

export const UserSettings = (): JSX.Element => {
  // TODO get userId through login
  const userId = 'UserId';

  const userQuery = useQuery(
    USER_QUERY_KEY(userId),
    async () => getUser(userId),
    {
      onError: () => {
        // TODO show toast or smth to let user know about the error
      },
    }
  );
  return (
    <div>
      <h2>Omat tiedot</h2>
      {userQuery.isSuccess ? <>Query failed</> : null}
      {userQuery.isError ? <>Query success</> : null}
    </div>
  );
};
