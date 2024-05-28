const defaultConfiguration: Configuration = {
  apiHost: 'https://api.greenbacks.app',
  isTestData: false,
};

const configurationOverrides: AllOptionalConfiguration = {
  apiHost: 'http://localhost:8000/dev',
  // isTestData: true,
};

export const configuration: Configuration = {
  ...defaultConfiguration,
  ...configurationOverrides,
};

export interface Configuration {
  apiHost: string;
  isTestData: boolean;
}

interface AllOptionalConfiguration {
  apiHost?: string;
  isTestData?: boolean;
}

export default configuration;
