import { FunctionComponent } from 'react';

import { useFinancialAuthorizer } from 'finance';
import noop from 'utils/noop';

const FinancialAuthorizer: FunctionComponent<propTypes> = ({
  onClose = noop,
  onSuccess = noop,
  token,
}: propTypes) => {
  const config = {
    onEvent: (event: string) => {
      if (event === 'HANDOFF') onClose();
    },
    onExit: onClose,
    onSuccess,
    token,
  };
  const { open } = useFinancialAuthorizer(config);

  if (open) open();

  return null;
};

interface propTypes {
  onClose?: { (): void };
  onSuccess?: { (token: string, metadata: any): void };
  token: string;
}

export default FinancialAuthorizer;
