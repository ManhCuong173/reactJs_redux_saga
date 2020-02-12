/* eslint-disable react/forbid-prop-types */
import { Box, Button, Grid, TextField, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import * as modalAction from './../../actions/modal';
import * as taskAction from './../../actions/tasks';
import * as formConstant from './../../constants/form';
import validate from './../FormHelper/ValidateForm';
import renderTextField from './../FormHelper/TextField';
import renderSelectField from './../FormHelper/SelectField';
import styles from './styles';

class TaskForm extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    // eslint-disable-next-line
    if (nextProps.taskEditing !== this.props.taskEditing) return true;
    return false;
  }

  handleClose = () => {
    // eslint-disable-next-line
    const { commonModalAction } = this.props;
    const { hideModal } = commonModalAction;
    hideModal();
  };

  submitform = data => {
    const { commonTaskAction, commonModalAction, taskEditing } = this.props;
    const { hideModal } = commonModalAction;
    const { addTask, updateTask } = commonTaskAction;
    const { title, description, status } = data;
    if (taskEditing && taskEditing.id >= 0) {
      updateTask(title, description, status);
      hideModal();
      return;
    }
    addTask(title, description);
    hideModal();
  };

  showStatusSelection = () => {
    const { taskEditing, classes } = this.props;
    let xhtml = null;
    if (taskEditing && taskEditing.id >= 0) {
      xhtml = (
        <Grid item md={12} sm={12}>
          <Field
            id="status"
            name="status"
            label="Multiline"
            className={classes.select}
            component={renderSelectField}
          >
            <MenuItem value={0}>Ready</MenuItem>
            <MenuItem value={1}>In Progress</MenuItem>
            <MenuItem value={2}>Completed</MenuItem>
          </Field>
        </Grid>
      );
    }
    return xhtml;
  };

  // Validate form
  required = value => {
    let error = 'Please fully fill the form';
    if (value !== null && typeof value !== 'undefined' && value.trim() !== '')
      error = null;
    return error;
  };

  minLength5 = value => {
    let error = null;
    if (value.length < 5) error = 'At least 5 letters';
    return error;
  };

  render() {
    // submitting: the field is not touched yet ==> disable submit button
    const {
      classes,
      handleSubmit,
      invalid,
      submitting,
      taskEditing,
    } = this.props;
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <form onSubmit={handleSubmit(this.submitform)}>
        <Grid container className={classes.formContainer}>
          <Grid item md={12} sm={12}>
            <Field
              name="title"
              component={renderTextField}
              type="text"
              id="title"
              label="Title"
              className={classes.textField}
            />
          </Grid>
          <Grid item md={12} sm={12}>
            <Field
              name="description"
              multiline
              rowsMax="4"
              label="Multiline"
              className={classes.textField}
              margin="normal"
              component={renderTextField}
            />
          </Grid>
          {this.showStatusSelection()}
          <Grid item md={12} sm={12} className={classes.buttonGroup}>
            <Box display="flex" flexDirection="row-reverse">
              <Button
                color="primary"
                type="submit"
                disabled={invalid || submitting}
              >
                Submit
              </Button>
              <Button color="secondary" onClick={this.handleClose}>
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    );
  }
}

TaskForm.propTypes = {
  // eslint-disable-next-line react/require-default-props
  classes: PropTypes.object,
  // eslint-disable-next-line
  commonModalAction: PropTypes.shape({
    hideModal: PropTypes.func,
  }),
  commonTaskAction: PropTypes.shape({
    addTask: PropTypes.func,
    updateTask: PropTypes.func,
  }),
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  taskEditing: PropTypes.object,
};

const mapStateToProps = state => ({
  taskEditing: state.tasks.editTask,
  initialValues: {
    title: state.tasks.editTask ? state.tasks.editTask.title : null,
    description: state.tasks.editTask ? state.tasks.editTask.description : null,
    status: state.tasks.editTask ? state.tasks.editTask.status : null,
  },
});
const mapDispatchToProps = dispatch => ({
  commonModalAction: bindActionCreators(modalAction, dispatch),
  commonTaskAction: bindActionCreators(taskAction, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReduxForm = reduxForm({
  form: formConstant.FORM_NAME,
  validate,
});

export default compose(
  withStyles(styles),
  withConnect,
  withReduxForm,
)(TaskForm);
