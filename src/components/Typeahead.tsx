import React, { FC } from 'react';

import Input from 'components/Input';
import RadioButtons from 'components/RadioButtons';
import Option, { ComplexOption } from 'types/option';
import getOption from 'utils/getOption';

const Typeahead: FC<{
  id: string;
  onChange?: (input: string) => void;
  options?: (Option | string)[];
  value?: string;
}> = ({ id, onChange, options = [], value }) => {
  const visibleOptions = getVisibleOptions({ options, value });
  return (
    <>
      <Input
        hasSharpLowerCorners={!!value}
        id={id}
        onChange={onChange}
        value={value}
      />
      <RadioButtons
        hasSharpUpperCorners
        onChange={onChange}
        options={visibleOptions}
      />
    </>
  );
};

function getVisibleOptions({
  options,
  value,
}: {
  options?: Option[];
  value?: string;
}): ComplexOption[] {
  if (!options || !value) return [];
  const complexOptions = options.map(getOption);
  return complexOptions.filter((option) => {
    const lowercaseOption = option.value.toLowerCase();
    const lowercaseValue = value.toLowerCase();
    return lowercaseOption.includes(lowercaseValue);
  });
}

export default Typeahead;
