export type UseQuery<Data> = {
  data?: Data;
  isError: boolean;
  isLoading: boolean;
};

export type UseMutation<Data, Payload> = {
  data?: Data;
  isError: boolean;
  isLoading: boolean;
  mutate: (payload: Payload) => void;
};
