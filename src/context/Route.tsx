import React, { FC } from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

const RouteProvider = BrowserRouter;

export const TestRouteProvider: FC<TestProviderProps> = ({
  children,
  route = '/',
} = {}) => <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>;

export interface TestProviderProps {
  route?: string;
}

export default RouteProvider;
