import styled, { css } from 'styled-components';

export interface StackProps {
  alignItems?: string;
  justifyContent?: string;
  wrap?: boolean | string;
  width?: string;
  gap?: string;
}

const common = css<StackProps>`
  display: flex;
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  flex-wrap: ${({ wrap }) =>
    typeof wrap === 'boolean' ? (wrap ? 'wrap' : 'nowrap') : wrap};
  width: ${({ width }) => width};
  gap: ${({ gap }) => gap};
`;

export const VStack = styled.div<StackProps>`
  ${common};
  flex-direction: column;
`;

export const HStack = styled.div<StackProps>`
  ${common};
  flex-direction: row;
`;
