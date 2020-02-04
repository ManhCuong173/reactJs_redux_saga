import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Add from '@material-ui/icons/Add';
import styles from './styles';
import { STATUSES } from '../../constants/index';
import TaskList from '../../components/TaskList';
import TaskForm from '../../components/TaskForm';

const data = [
  {
    id: 1,
    title: 'Do homework',
    description: 'This is small description',
    status: 0,
  },
  {
    id: 1,
    title: 'Learning Material-UI',
    description: 'This is small description',
    status: 2,
  },
  {
    id: 1,
    title: 'Learning Mock Database',
    description: 'This is small description',
    status: 1,
  },
];

class TaskBoard extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    open: false,
  };

  handleClose = value => {
    this.setState({ open: value });
  };

  addNewTask = () => {
    this.setState({ open: true });
  };

  renderForm = () => {
    let xhtml = null;
    // eslint-disable-next-line react/jsx-filename-extension
    // eslint-disable-next-line react/destructuring-assignment
    xhtml = <TaskForm open={this.state.open} handleClose={this.handleClose} />;
    return xhtml;
  };

  renderBoard = classes => {
    let xhtml = null;
    xhtml = (
      <Grid container className={classes.mainLayout}>
        {STATUSES.map(status => {
          const taskFilter = data.filter(item => item.status === status.value);
          return (
            <TaskList tasks={taskFilter} status={status} key={status.value} />
          );
        })}
      </Grid>
    );

    return xhtml;
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.shape}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.addNewTask}
        >
          <Add />
          Thêm mới công việc
        </Button>
        {this.renderBoard(classes)}
        {this.renderForm()}
      </div>
    );
  }
}

TaskBoard.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(TaskBoard);
