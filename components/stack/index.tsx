import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import type { Property } from 'csstype';
import styles from './styles.module.scss';

export interface StackProps {
  alignItems?: Property.AlignItems;
  justifyContent?: Property.JustifyContent;
  wrap?: boolean | Property.FlexWrap;
  width?: string;
  gap?: string;
}

type Props = PropsWithChildren<HTMLAttributes<HTMLDivElement> & StackProps>;

const _Stack: FC<Props> = ({
  children,
  alignItems,
  justifyContent,
  wrap,
  width,
  gap,
  style = {},
  ...props
}) => (
  <div
    style={{
      alignItems,
      justifyContent,
      flexWrap: typeof wrap === 'boolean' ? (wrap ? 'wrap' : 'nowrap') : wrap,
      width,
      gap,
      ...style
    }}
    {...props}
  >
    {children}
  </div>
);

export const HStack: FC<Props> = ({ className, children, ...props }) => (
  <_Stack className={`${styles.h_stack} ${className || ''}`} {...props}>
    {children}
  </_Stack>
);

export const VStack: FC<Props> = ({ className, children, ...props }) => (
  <_Stack className={`${styles.v_stack} ${className || ''}`} {...props}>
    {children}
  </_Stack>
);

export const Stack: FC<Props & { direction: 'vertical' | 'horizontal' }> = ({
  direction,
  ...props
}) =>
  direction === 'vertical' ? <VStack {...props} /> : <HStack {...props} />;
