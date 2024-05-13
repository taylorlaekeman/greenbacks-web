import styled from 'utils/styled';

export const Panel = styled.div<{
  hasBorder?: boolean;
  hasTopBorder?: boolean;
}>`
  ${({ hasBorder = true }) =>
    hasBorder &&
    `
      border: solid lightgrey 1px;
      border-radius: 4px;
  `}

  ${({ hasTopBorder = false }) =>
    hasTopBorder && 'border-top: solid lightgrey 1px;'}

  min-width: 250px;
`;

export const PanelHeader = styled.div<{
  hasBottomBorder?: boolean;
  isColumnar?: boolean;
  isShort?: boolean;
}>`
  ${({ hasBottomBorder = true }) =>
    hasBottomBorder && 'border-bottom: solid lightgrey 1px;'}
  display: flex;
  ${({ isColumnar = false }) =>
    isColumnar && 'flex-direction: column; gap: 8px;'}
  justify-content: space-between;
  padding: ${({ isShort = false }) => (isShort ? '8px' : '16px')} 16px;
`;

export const PanelBody = styled.div`
  padding: 16px;
`;