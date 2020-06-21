import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import ExternalLink from '../external-link';

const StyledList = styled.div`
  padding: 10px 0;

  h2 {
    padding-bottom: 4px;
    border-bottom: 1px solid
      ${({ theme: { background, lighten } }) => lighten(0.25, background)};
  }

  table {
    width: 100%;
    font-size: 1.13rem;

    th,
    td {
      padding: 3px 0;
    }

    th {
      text-align: left;
      font-weight: 400;
    }

    td,
    td > a {
      text-align: right;
      font-weight: 600;
    }
  }
`;

interface Icon extends React.SVGAttributes<SVGElement> {
  color?: string;
  size?: string | number;
}

type Props = {
  title: string;
  values: Array<{
    name: string;
    value: string;
    icon?: React.FC<Icon>;
    isInternal?: boolean;
    link?: string;
  }>;
};

const List: React.FC<Props> = ({ values = [], title = '' }) => (
  <StyledList>
    <h2>{title}</h2>
    <table>
      <tbody>
        {values.map((v, key) => {
          const Icon = v.icon;

          return (
            <tr key={key}>
              <th>
                {Icon && <Icon size={18} className="icon" />} {v.name}
              </th>
              <td>
                {v.link ? (
                  v.isInternal ? (
                    <Link href={v.link}>
                      <a>{v.value}</a>
                    </Link>
                  ) : (
                    <ExternalLink href={v.link} rel="me">
                      {v.value}
                    </ExternalLink>
                  )
                ) : (
                  v.value
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </StyledList>
);

export default List;
