/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable consistent-return */
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import styles from './styles';

const renderFormHelper = ({ touched, error }) => {
  if (!(touched && error)) return;
  return <FormHelperText>{touched && error}</FormHelperText>;
};

renderFormHelper.propTypes = {
  touched: PropTypes.bool,
  error: PropTypes.bool,
};

const renderSelectField = ({
  classes,
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl error={touched && error} className={classes.select}>
    <InputLabel htmlFor="status-task">Status</InputLabel>
    <Select
      {...input}
      {...custom}
      inputProps={{
        name: 'status-task',
        id: 'status-task',
      }}
      value={input.value}
    >
      {children}
    </Select>
    {renderFormHelper({ touched, error })}
  </FormControl>
);

renderSelectField.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
  children: PropTypes.array,
  classes: PropTypes.object,
};

export default withStyles(styles)(renderSelectField);
