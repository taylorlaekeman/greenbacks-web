import React, { createContext, FC, useState } from 'react';

import Transaction from 'types/transaction';
import noop from 'utils/noop';

export interface ITagModal {
  closeModal: () => void;
  openModal: (transaction: Transaction) => void;
  transactionToTag?: Transaction;
}

const TagModalContext = createContext<ITagModal>({
  closeModal: noop,
  openModal: noop,
});

export const TagModalProvider: FC = ({ children }) => {
  const [transactionToTag, setTransactionToTag] = useState<
    Transaction | undefined
  >();
  return (
    <TagModalContext.Provider
      value={{
        closeModal: () => {
          setTransactionToTag(undefined);
        },
        openModal: (transaction) => {
          setTransactionToTag(transaction);
        },
        transactionToTag,
      }}
    >
      {children}
    </TagModalContext.Provider>
  );
};

export default TagModalContext;
