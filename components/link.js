import React from 'react';
import PropTypes from 'prop-types';

const ExternalLink = props => {
  const { href, children, ...others } = props;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...others}>
      {children}
    </a>
  );
};

ExternalLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default ExternalLink;
