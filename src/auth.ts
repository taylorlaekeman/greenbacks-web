export {
  Auth0Provider as Provider,
  useAuth0 as useAuth,
} from '@auth0/auth0-react';

const REDIRECT_LOCATION = 'redirectLocation';

export const useRedirectLocation = (): UseRedirectLocationResponse => {
  const clearRedirectLocation = () => {
    localStorage.removeItem(REDIRECT_LOCATION);
  };
  const getRedirectLocation = () => localStorage.getItem(REDIRECT_LOCATION);
  const saveRedirectLocation = (redirectUri: string) => {
    if (isAuthCallbackUri(redirectUri)) return;
    const redirectLocation = redirectUri.replace(window.location.origin, '');
    localStorage.setItem(REDIRECT_LOCATION, redirectLocation);
  };
  return { clearRedirectLocation, getRedirectLocation, saveRedirectLocation };
};

interface UseRedirectLocationResponse {
  clearRedirectLocation: { (): void };
  getRedirectLocation: { (): string | null };
  saveRedirectLocation: { (redirectUri: string): void };
}

const isAuthCallbackUri = (uri: string) => {
  const queryParameterNames = getQueryParameterNames(uri);
  if (queryParameterNames.length !== 2) return false;
  if (!queryParameterNames.includes('code')) return false;
  if (!queryParameterNames.includes('state')) return false;
  return true;
};

const getQueryParameterNames = (uri: string) => {
  const queryParameterSegment = uri.split('?')[1];
  const queryParameterList = queryParameterSegment?.split('&') || [];
  return queryParameterList.map((parameter) => parameter.split('=')[0]);
};
