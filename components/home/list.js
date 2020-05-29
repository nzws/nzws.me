import React from 'react';
import PropTypes from 'prop-types';
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

const List = ({ values = [], title = '' }) => (
  <StyledList>
    <h2>{title}</h2>
    <table>
      <tbody>
        {values.map((v, key) => {
          const Icon = v[2];

          return (
            <tr key={key}>
              <th>
                {Icon && <Icon size={18} className="icon" />} {v[0]}
              </th>
              <td>
                {v[3] ? (
                  v[4] ? (
                    <Link href={v[3]}>
                      <a>{v[1]}</a>
                    </Link>
                  ) : (
                    <ExternalLink href={v[3]} rel="me">
                      {v[1]}
                    </ExternalLink>
                  )
                ) : (
                  v[1]
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </StyledList>
);

List.propTypes = {
  values: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};

export default List;
