import styled from 'styled-components';

export interface AvatarProps {
  size: number;
  isCircle?: boolean;
  url?: string;
}

type Props = AvatarProps;

export const Avatar = styled.div<AvatarProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ isCircle, size }) =>
    isCircle ? `${size}px` : size <= 48 ? '12px' : '6px'};
  background-color: ${({ theme }) => theme.colors.border};
`;
