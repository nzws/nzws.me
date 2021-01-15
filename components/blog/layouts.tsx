import styled from 'styled-components';
import media from 'styled-media-query';

export const mediaDesktop = media.greaterThan('medium');
export const mediaMobile = media.lessThan('medium');

export const Main = styled.main`
  font-weight: 300;
  font-size: 1.2rem;
  line-height: 2;
  word-break: break-word;

  p {
    padding-top: 4px;
    padding-bottom: 10px;
  }

  ul,
  img {
    padding: 10px 0;
  }

  li {
    padding: 3px 0;
  }

  img,
  iframe {
    margin: 0 auto;
  }

  img,
  iframe,
  .twitter-tweet,
  table {
    display: block;
    max-width: 100%;
  }

  iframe,
  .twitter-tweet,
  pre,
  table {
    margin: 10px auto;
  }

  blockquote {
    margin: 10px 0;
    padding: 4px 10px;
    border-left: 5px solid
      ${({ theme: { background, lighten } }) => lighten(0.3, background)};
    color: ${({ theme: { text, darken } }) => darken(0.1, text)};
  }

  pre,
  code,
  blockquote {
    background: ${({ theme: { background, lighten } }) =>
      lighten(0.05, background)};
  }

  code {
    padding: 2px 4px;
    word-break: break-all;
  }

  pre > code {
    padding: 0;
    background: none;
  }

  pre {
    padding: 10px;
    overflow-x: auto;
  }

  hr {
    border-color: ${({ theme: { background, lighten } }) =>
      lighten(0.2, background)};
    margin: 10px 0;
  }

  ul > li > ul {
    margin-left: 1rem;
    padding: 0;
  }

  table {
    overflow-x: auto;
    border-collapse: collapse;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;

    th,
    td {
      min-width: 100px;
      padding: 8px 12px;
      border: 1px solid
        ${({ theme: { background, lighten } }) => lighten(0.2, background)};
    }
  }
`;

export const Container = styled.div`
  width: 800px;
  max-width: calc(100% - 20px);
  margin: 20px auto;
`;
