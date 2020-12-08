import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

export const Provider = Auth0Provider;

export const useAuth = useAuth0;

export default {
  provider: Provider,
  useAuth: useAuth,
};
