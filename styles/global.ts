import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Noto Serif JP', serif;
    font-size: 1rem;
    line-height: 1.6;
    font-weight: 300;
    font-style: normal;
    color: ${({ theme: { text } }) => text};
    background: ${({ theme: { background } }) => background};
  }

  b, strong {
    font-weight: 600;
    font-size: 1.1rem;
    margin-right: 2px;
  }

  a {
    color: ${({ theme: { linkBase } }) => linkBase};
    text-decoration: none;
    font-weight: 400;
    word-break: break-all;

    :hover {
      text-decoration: underline;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
  }

  *, *:after, *:before {
    box-sizing: border-box;
    transition: 200ms ease;
    outline: 0;
    scrollbar-color: ${({ theme: { background, lighten } }) =>
      `${lighten(0.2, background)} ${background}`};
    scrollbar-width: thin;
  }

  .icon {
    position: relative;
    top: 3px;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme: { background, lighten } }) =>
      lighten(0.2, background)};
    border: none;
  }

  #nprogress .peg {
    box-shadow: none;
  }
`;
