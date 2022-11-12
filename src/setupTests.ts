import '@testing-library/jest-dom';

import noop from 'utils/noop';

const TEST_TIMEOUT_IN_MS = 15 * 1000;

jest.setTimeout(TEST_TIMEOUT_IN_MS);

class TestResizeObserver {
  disconnect = noop;

  observe = noop;

  unobserve = noop;
}

window.ResizeObserver = TestResizeObserver;
