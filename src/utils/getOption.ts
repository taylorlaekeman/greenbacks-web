import Option, { ComplexOption } from 'types/option';

function getOption(option: Option): ComplexOption {
  if (typeof option === 'string') return { label: option, value: option };
  return option;
}

export default getOption;
