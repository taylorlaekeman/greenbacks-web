import styled from 'utils/styled';

export const Panel = styled.div<{
  hasBorder?: boolean;
  hasTopBorder?: boolean;
}>`
  background-color: white;

  ${({ hasBorder = true }) =>
    hasBorder &&
    `
      border: solid lightgrey 1px;
      border-radius: 4px;
  `}

  ${({ hasTopBorder = false }) =>
    hasTopBorder && 'border-top: solid lightgrey 1px;'}

  height: max-content;
  min-width: 250px;
`;

export const PanelHeader = styled.div<{
  hasBottomBorder?: boolean;
  isColumnar?: boolean;
  isShort?: boolean;
}>`
  ${({ hasBottomBorder = true }) =>
    hasBottomBorder && 'border-bottom: solid lightgrey 1px;'}
  ${({ isColumnar = false }) =>
    isColumnar && 'display: flex; flex-direction: column; gap: 8px;'}
  padding: ${({ isShort = false }) => (isShort ? '8px' : '16px')} 16px;
`;

export const PanelBody = styled.div<{ hasBottomBorder?: boolean }>`
  padding: 16px;
  ${({ hasBottomBorder = false }) =>
    hasBottomBorder && 'border-bottom: solid lightgrey 1px;'}
`;
