import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import styles from './styles';

class TaskItem extends Component {
  showTask = (tasks, classes) => {
    let result = null;
    const { onClickEdit, onClickRemove } = this.props;
    result = tasks.map(item => (
      <Card className={classes.card} key={item.id}>
        <CardContent>
          <Grid container justify="space-between">
            <Grid item md={12}>
              <Typography variant="subtitle1">{item.title}</Typography>
              <Typography variant="subtitle2">{item.description}</Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Fab
            color="primary"
            aria-label="Edit"
            className={classes.fab}
            size="small"
            onClick={() => onClickEdit(item)}
          >
            <Icon fontSize="small">edit_icon</Icon>
          </Fab>
          <Fab
            color="secondary"
            aria-label="Delete"
            className={classes.fab}
            size="small"
            onClick={() => onClickRemove(item)}
          >
            <Icon fontSize="small">delete_icon</Icon>
          </Fab>
        </CardActions>
      </Card>
    ));
    return result;
  };

  render() {
    const { tasks } = this.props;
    const { classes } = this.props;
    return <React.Fragment>{this.showTask(tasks, classes)}</React.Fragment>;
  }
}

TaskItem.propTypes = {
  classes: PropTypes.object,
  tasks: PropTypes.array,
  onClickEdit: PropTypes.func,
  onClickRemove: PropTypes.func,
};

export default withStyles(styles)(TaskItem);
