import styled from 'styled-components';

export const Footer = styled.footer`
  border-top: 1px solid
    ${({ theme: { background, lighten } }) => lighten(0.2, background)};
  margin-top: 10px;
  padding-top: 10px;
  display: flex;

  .right {
    margin-left: auto;

    a {
      margin-left: 20px;
    }
  }

  .left {
    margin-top: 8px;
    font-size: 0.85rem;

    a {
      margin: 0 5px;
    }
  }
`;
