export const defaultTheme = {
  dark: true,
  colors: {
    white: '#ffffff',
    backgroundPrimary: '#392623',
    backgroundSecondary: '#674138',
    primary: '#E33636',
    success: '#32AD79',
    border: '#9D7474',
    primaryText: '#E1E1E1',
    secondaryText: '#BE9E9E',
    transparentButtonBackground: '#99000000',
    normalButtonText: '#E1E1E1'
  },
  fontSize: {
    small: '11px',
    body: '14px',
    secondary: '12px',
    title: '16px'
  }
} as const;

export type Theme = typeof defaultTheme;
export type Colors = Theme['colors'];
