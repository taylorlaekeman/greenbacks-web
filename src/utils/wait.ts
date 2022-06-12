const wait = async ({
  cycles = 1,
  time = 0,
}: { cycles?: number; time?: number } = {}): Promise<void> => {
  for (let i = 0; i < cycles; i += 1) {
    // sequentially awaiting is exactly the point of this function,
    // so disabling this rule here

    /* eslint-disable no-await-in-loop */
    await waitOnce({ time });
  }
};

const waitOnce = ({ time = 0 }: { time?: number } = {}): Promise<void> =>
  new Promise((resolve) => setTimeout(() => resolve(), time));

export default wait;
