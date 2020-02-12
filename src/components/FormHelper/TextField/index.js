import React from 'react';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

const renderTextField = ({
  label,
  // Truyền những tham số common action của input như onChange, onClick, onBlur,...
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    // eslint-disable-next-line
    {...input}
    // eslint-disable-next-line
    {...custom}
  />
);

renderTextField.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
};

export default renderTextField;
