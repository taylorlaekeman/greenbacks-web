const wait = ({ time = 0 }: { time?: number } = {}): Promise<void> =>
  new Promise((resolve) => setTimeout(() => resolve(), time));

export default wait;
