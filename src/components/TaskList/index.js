import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TaskItem from '../TaskItem';
import styles from './styles';

class TaskList extends Component {
  render() {
    const { classes } = this.props;
    const { tasks } = this.props;
    const { status } = this.props;
    const { onClickEdit, onClickRemove } = this.props;
    if (tasks.length) {
      return (
        <Grid item md={4} xs={12}>
          <div className={classes.status}>{status.label}</div>
          <div>
            <TaskItem
              tasks={tasks}
              onClickEdit={onClickEdit}
              onClickRemove={onClickRemove}
            />
          </div>
        </Grid>
      );
    }

    return (
      <Grid item md={4} xs={12}>
        <div className={classes.status}>{status.label}</div>
        <div className={classes.wrapperListTask} />
      </Grid>
    );
  }
}

TaskList.propTypes = {
  classes: PropTypes.object,
  tasks: PropTypes.array,
  status: PropTypes.object,
  onClickEdit: PropTypes.func,
  onClickRemove: PropTypes.func,
};

export default withStyles(styles)(TaskList);
