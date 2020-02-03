import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Block = styled.div({
  marginBottom: '20px',
  ul: {
    padding: 0,
    li: {
      borderLeft: `solid 4px gray`,
      marginBottom: '5px',
      padding: '1px',
      paddingLeft: '8px',
      listStyleType: 'none'
    }
  }
});

const LinksBlock = ({ title, children }) => (
  <Block>
    <b>{title}</b>
    <ul>{children}</ul>
  </Block>
);

LinksBlock.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default LinksBlock;
