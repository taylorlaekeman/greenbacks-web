import React, { FC, useState } from 'react';

import Button from 'components/Button';
import Input from 'components/Input';
import Label from 'components/Label';
import RadioButtons from 'components/RadioButtons';
import useAddFilter from 'hooks/useAddFilter';
import { FilterType } from 'types/filter';
import Transaction, { Category } from 'types/transaction';
import getUuid from 'utils/uuid';

const AddFilter: FC<{ transaction: Transaction }> = ({ transaction }) => {
  const { id, name } = transaction;
  const { addFilter } = useAddFilter();
  const [property, setProperty] = useState<string>();
  const [category, setCategory] = useState<string>('');
  const [tag, setTag] = useState<string>();
  return (
    <form>
      <RadioButtons
        name="property"
        options={[
          { label: `Transactions with name '${name}'`, value: 'name' },
          { label: 'Only this transaction', value: 'id' },
        ]}
        onChange={(newProperty) => setProperty(newProperty)}
        value={property}
      />
      <RadioButtons
        label="Category"
        name="category"
        options={Object.values(Category)}
        onChange={(newCategory) => setCategory(newCategory)}
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
          if (!property) return;
          const type =
            property === 'id' ? FilterType.Id : FilterType.OneTransaction;
          addFilter({
            filter: {
              categoryToAssign: category as Category,
              id: getUuid(),
              matchers: [
                {
                  property,
                  expectedValue: property === 'id' ? id : name,
                },
              ],
              tagToAssign: tag,
              type,
            },
          });
        }}
      >
        Add filter
      </Button>
    </form>
  );
};

const PROPERTY_OPTIONS = [
  { label: 'Name', value: 'name' },
  { label: 'Id', value: 'id' },
];

export default AddFilter;
