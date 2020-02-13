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

const Title = styled.div({
  marginBottom: '10px'
});

const LinksBlock = ({ title, children }) => (
  <Block>
    <Title>
      <b>{title}</b>
    </Title>
    {children}
  </Block>
);

LinksBlock.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default LinksBlock;
