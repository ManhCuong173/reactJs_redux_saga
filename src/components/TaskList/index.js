import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import TaskItem from '../TaskItem';
import styles from './styles';

class TaskList extends Component {
  render() {
    const { classes } = this.props;
    const { tasks } = this.props;
    const { status } = this.props;
    return (
      <Grid item md={4} xs={12}>
        <div className={classes.status}>{status.label}</div>
        <div className={classes.wrapperListTask}>
          <TaskItem tasks={tasks} />
        </div>
      </Grid>
    );
  }
}

export default withStyles(styles)(TaskList);
