import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ExternalLink from '../external-link';

const StyledItem = styled(ExternalLink)`
  display: inline-block;
  width: 100%;
  border-radius: 5px;
  margin-bottom: 1rem;
  background: ${({ theme: { background, lighten } }) =>
    lighten(0.15, background)};
  color: ${({ theme: { text } }) => text};

  :hover {
    text-decoration: none;
  }

  img {
    display: block;
    max-width: 100%;
    border-radius: 5px 5px 0 0;
  }

  div {
    padding: 10px;
  }

  h2 {
    margin-top: 0;
  }
`;

const Tag = styled.span`
  font-size: 1rem;
  margin-right: 5px;

  span {
    font-size: 1rem;
    margin-left: 1px;
  }
`;

const Item = ({
  title = '',
  link = '',
  tags = [],
  description = '',
  image = ''
}) => (
  <StyledItem href={link}>
    {image && <img src={image} alt={title} />}
    <div>
      <h2>{title}</h2>
      {tags && (
        <p>
          {tags.map(tag => (
            <Tag key={tag}>
              #<span>{tag}</span>
            </Tag>
          ))}
        </p>
      )}
      {description && <p>{description}</p>}
    </div>
  </StyledItem>
);

Item.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  tags: PropTypes.array,
  description: PropTypes.string,
  image: PropTypes.string
};

export default Item;
