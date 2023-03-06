import { createGlobalStyle } from 'styled-components';
import { Sans } from '../styles/font';

export const GlobalStyle = createGlobalStyle`
  body {
    ${Sans.style};
    font-weight: 400;
    color: ${({ theme: { colors } }) => colors.primaryText};
    background: ${({ theme: { colors } }) => colors.backgroundPrimary};
    font-size: ${({ theme: { fontSize } }) => fontSize.body};
  }

  a {
    color: ${({ theme: { colors } }) => colors.primaryText};
    text-decoration: underline;
    word-break: break-all;
  }

  b, strong {
    font-weight: 600;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
  }

  *, *:after, *:before {
    box-sizing: border-box;
    scrollbar-color: ${({ theme: { colors } }) => colors.backgroundSecondary};
    scrollbar-width: thin;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-thumb {
    scrollbar-color: ${({ theme: { colors } }) => colors.backgroundSecondary};
    border: none;
  }
`;
