import UnfilteredTransaction from 'types/unfilteredTransaction';

interface Matcher {
  expectedValue: string;
  property: keyof UnfilteredTransaction;
}

export default Matcher;
