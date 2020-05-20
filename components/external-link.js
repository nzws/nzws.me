import React from 'react';
import PropTypes from 'prop-types';

const ExternalLink = props => {
  const { href, children, ...prop } = props;

  return (
    <a target="_blank" rel="noopener noreferrer" href={href} {...prop}>
      {children}
    </a>
  );
};

ExternalLink.propTypes = {
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default ExternalLink;
