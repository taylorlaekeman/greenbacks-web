import CoreTransaction from 'types/coreTransaction';

interface UnfilteredTransaction extends CoreTransaction {
  accountId: string;
}

export default UnfilteredTransaction;
