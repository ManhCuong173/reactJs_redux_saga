/* eslint-disable react/forbid-prop-types */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react'
import styles from './styles'

class TaskForm extends Component {
  handleClose = () => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.handleClose(false);
  };

  render() {
    const { classes, open } = this.props;
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <div>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Thêm mới công việc</DialogTitle>
          <DialogContent>
            <TextField
              id="standard-name"
              label="Name"
              className={classes.texTField}
              margin="normal"
            />
            <TextField
              id="standard-work"
              label="Multiline"
              className={classes.texTField}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="secondary">
              Subcribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

TaskForm.propTypes = {
  // eslint-disable-next-line react/require-default-props
  classes: PropTypes.object,
  // eslint-disable-next-line react/require-default-props
  handleClose: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  open: PropTypes.bool,
};

export default withStyles(styles)(TaskForm);
