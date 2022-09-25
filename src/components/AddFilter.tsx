import React, { FC, useState } from 'react';

import Button from 'components/Button';
import Input from 'components/Input';
import Label from 'components/Label';
import SectionContainer from 'components/SectionContainer';
import Select from 'components/Select';
import useAddFilter from 'hooks/useAddFilter';
import { FilterType } from 'types/filter';
import { Category } from 'types/transaction';
import getUuid from 'utils/uuid';

const AddFilter: FC = () => {
  const { addFilter } = useAddFilter();
  const [property, setProperty] = useState<string>('');
  const [expectedValue, setExpectedValue] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  return (
    <SectionContainer id="add-filter" title="Add Filter">
      <form>
        <Label forId="property">Property</Label>
        <Select
          id="property"
          onChange={(newProperty) => setProperty(newProperty)}
          options={PROPERTY_OPTIONS}
          value={property}
        />
        <Label forId="expectedValue">Expected Value</Label>
        <Input
          id="expectedValue"
          onChange={(newExpectedValue) => {
            setExpectedValue(newExpectedValue);
          }}
          value={expectedValue}
        />
        <Label forId="category">Category</Label>
        <Select
          id="category"
          onChange={(newCategory) => setCategory(newCategory)}
          options={Object.values(Category)}
          value={category}
        />
        <Label forId="tag">Tag</Label>
        <Input
          id="tag"
          onChange={(newTag) => {
            setTag(newTag);
          }}
          value={tag}
        />
        <Button
          onClick={() => {
            if (!property || !expectedValue) return;
            addFilter({
              filter: {
                categoryToAssign: category as Category,
                id: getUuid(),
                matchers: [
                  {
                    property,
                    expectedValue,
                  },
                ],
                tagToAssign: tag,
                type: FilterType.OneTransaction,
              },
            });
          }}
        >
          Save filter
        </Button>
      </form>
    </SectionContainer>
  );
};

const PROPERTY_OPTIONS = [{ label: 'Name', value: 'name' }];

export default AddFilter;
