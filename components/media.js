const breakpoints = {
  extra: 1440,
  large: 1170,
  medium: 768,
  small: 330
};

export const exmobile = `@media (max-width: ${breakpoints.small - 1}px)`;
export const mobile = `@media (max-width: ${breakpoints.large - 1}px)`;
export const desktop = `@media (min-width: ${breakpoints.large}px)`;
