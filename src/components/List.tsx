import styled from 'utils/styled';

export const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;

  & > li:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  & > li:last-child {
    border-bottom: solid black 1px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

export const Item = styled.li`
  border: solid black 1px;
  border-bottom: none;
  padding: 8px;
`;

export default List;
