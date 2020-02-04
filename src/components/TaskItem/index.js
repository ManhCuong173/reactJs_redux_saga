import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './styles';

class TaskItem extends Component {
  showTask = tasks => {
    let result = null;
    result = tasks.map(item => (
      <Grid container justify="space-between" key={item.id}>
        <Grid item md={12}>
          <Typography variant="subtitle1">{item.title}</Typography>
          <Typography variant="subtitle2">{item.description}</Typography>
        </Grid>
      </Grid>
    ));

    return result;
  };

  render() {
    const { tasks } = this.props;
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>{this.showTask(tasks)}</CardContent>
        <CardActions className={classes.cardActions}>
          <Fab
            color="primary"
            aria-label="Edit"
            className={classes.fab}
            size="small"
          >
            <Icon fontSize="small">edit_icon</Icon>
          </Fab>
          <Fab
            color="secondary"
            aria-label="Delete"
            className={classes.fab}
            size="small"
          >
            <Icon fontSize="small">delete_icon</Icon>
          </Fab>
        </CardActions>
      </Card>
    );
  }
}

TaskItem.propTypes = {
  classes: PropTypes.object,
  tasks: PropTypes.array,
};

export default withStyles(styles)(TaskItem);
