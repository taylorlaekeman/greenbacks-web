import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

import Link from 'components/Link';
import useMonth from 'hooks/useMonth';
import styled from 'utils/styled';

const MonthSelector: FC = () => {
  const { nextMonth, previousMonth, readable: readableMonth } = useMonth();
  const { pathname, search } = useLocation();
  const previousMonthUrl = `${pathname}?${addQueryParam(
    search,
    'month',
    previousMonth
  )}`;
  const nextMonthUrl = `${pathname}?${addQueryParam(
    search,
    'month',
    nextMonth
  )}`;
  return (
    <Wrapper>
      <Link href={previousMonthUrl}>previous</Link>
      <p>{readableMonth}</p>
      <Link href={nextMonthUrl}>next</Link>
    </Wrapper>
  );
};

function addQueryParam(
  currentParams: string,
  newKey: string,
  newValue: string
): string {
  const queryParams = new URLSearchParams(currentParams);
  queryParams.set(newKey, newValue);
  return queryParams.toString();
}

const Wrapper = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: 1fr max-content 1fr;

  a:last-child {
    justify-self: end;
  }
`;

export default MonthSelector;
