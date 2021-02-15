import { gql } from '@apollo/client';

export { useMutation } from '@apollo/client';

export const mutations = {
  createFinancialAccount: gql`
    mutation CreateFinancialAccount($token: String!) {
      createFinancialAccount(input: { token: $token }) {
        id
        institution
      }
    }
  `,
};
