import { DateTime } from 'luxon';
import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { Button, ButtonStyle } from 'components/Button';
import { Icon, IconType } from 'components/Icon';
import Link from 'components/Link';
import { Text } from 'components/Text';
import useMonth from 'hooks/useMonth';
import noop from 'utils/noop';
import styled from 'utils/styled';

const QueryParameterMonthSelector: FC = () => {
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
      <Link href={previousMonthUrl}>
        <Icon icon={IconType.ChevronLeft} />
      </Link>
      <p>{readableMonth}</p>
      <Link href={nextMonthUrl}>
        <Icon icon={IconType.ChevronRight} />
      </Link>
    </Wrapper>
  );
};

export function PureMonthSelector({
  month,
  onClickNext = noop,
  onClickPrevious = noop,
}: {
  month: DateTime;
  onClickNext?: () => void;
  onClickPrevious?: () => void;
}): React.ReactElement {
  return (
    <Wrapper>
      <Button onClick={onClickPrevious} style={ButtonStyle.Unstyled}>
        <Icon icon={IconType.ChevronLeft} />
      </Button>
      <Text>{month.toLocaleString({ month: 'long', year: 'numeric' })}</Text>
      <Button onClick={onClickNext} style={ButtonStyle.Unstyled}>
        <Icon icon={IconType.ChevronRight} />
      </Button>
    </Wrapper>
  );
}

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
  align-items: baseline;
  display: flex;
  justify-content: space-between;
`;

export default QueryParameterMonthSelector;
