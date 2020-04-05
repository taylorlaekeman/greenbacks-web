import React from 'react';
import PropTypes from 'prop-types';

const Form = ({ children, className }) => (
  <form className={className} noValidate>
    {children}
  </form>
);

Form.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Form.defaultProps = {
  children: null,
  className: '',
};

export default Form;
