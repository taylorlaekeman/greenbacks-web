import { gql } from '@apollo/client';

export { useMutation } from '@apollo/client';

export const mutations = {
  createConnection: gql`
    mutation CreateConnection($token: String!) {
      createConnection(input: { token: $token }) {
        id
        institution {
          name
        }
      }
    }
  `,
};
