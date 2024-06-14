import { gql, useMutation as useMutationExternal } from '@apollo/client';

const useMutation: IUseMutation = ({ mutation }) => {
  const [mutate] = useMutationExternal(gql(mutation));
  return { mutate };
};

export type IUseMutation = <TVariables>(input: UseMutationInput) => {
  mutate: (mutateInput: { variables: TVariables }) => void;
};

export interface UseMutationInput {
  mutation: string;
}

export default useMutation;
