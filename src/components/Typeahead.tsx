import React, { FC } from 'react';
import styled from 'styled-components';

import Input from 'components/Input';
import RadioButtons from 'components/RadioButtons';
import { Size, Text } from 'components/Text';
import Option, { ComplexOption } from 'types/option';
import getOption from 'utils/getOption';

const Typeahead: FC<{
  id: string;
  onChange?: (input: string) => void;
  options?: (Option | string)[];
  placeholder?: string;
  value?: string;
  visibleOptionCount?: number;
}> = ({
  id,
  onChange,
  options = [],
  placeholder = 'Search',
  value,
  visibleOptionCount = 4,
}) => {
  const matchingOptions = getMatchingOptions({
    options,
    value,
  });
  const visibleOptions = matchingOptions.slice(0, visibleOptionCount);
  return (
    <>
      <Input
        hasSharpLowerCorners={visibleOptions.length > 0}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
      {visibleOptions.length > 0 && (
        <RadioButtons
          hasSharpUpperCorners
          hasTopBorder={false}
          hasVisibleButtons={false}
          onChange={onChange}
          options={visibleOptions}
        />
      )}
      {matchingOptions.length > visibleOptions.length && (
        <TextWrapper>
          <Text size={Size.Small}>
            {matchingOptions.length - visibleOptions.length} more matching
            options
          </Text>
        </TextWrapper>
      )}
    </>
  );
};

function getMatchingOptions({
  options,
  value,
}: {
  options?: Option[];
  value?: string;
}): ComplexOption[] {
  if (!options) return [];
  const complexOptions = options.map(getOption);
  if (!value) return complexOptions;
  return complexOptions.filter((option) => {
    const lowercaseOption = option.value.toLowerCase();
    const lowercaseValue = value.toLowerCase();
    const containsValue = lowercaseOption.includes(lowercaseValue);
    const isValue = lowercaseOption === lowercaseValue;
    return containsValue && !isValue;
  });
}

const TextWrapper = styled.div`
  padding 8px 16px;
`;

export default Typeahead;
