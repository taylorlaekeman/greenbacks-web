import { gql } from '@apollo/client';

export { useMutation } from '@apollo/client';

export const mutations = {
  connectAccount: gql`
    mutation ConnectAccount($token: String!) {
      connectAccount(input: { token: $token }) {
        id
        institution
      }
    }
  `,
};
