/* eslint-disable import/no-cycle */
/* eslint-disable lines-between-class-members */
/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Add from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchBox from '../../components/SearchBox';
import TaskForm from '../../components/TaskForm';
import TaskList from '../../components/TaskList';
import { STATUSES } from '../../constants/index';
import * as taskAction from './../../actions/tasks';
import * as modalAction from './../../actions/modal';
import styles from './styles';

class TaskBoard extends Component {
  // eslint-disable-next-line react/state-in-constructor
  shouldComponentUpdate(nextProps, nextState) {
    const listTasks = { nextProps };
    const open = { nextState };
    if ({ listTasks } !== this.props || { open } !== this.state) {
      return true;
    }
    return false;
  }

  handleFilter = e => {
    const { taskAction } = this.props;
    const { fetchSearchKeyWord } = taskAction;
    fetchSearchKeyWord(e.target.value);
  };

  addNewTask = () => {
    const { modalAction, taskAction } = this.props;
    const { openAddTask } = taskAction;
    const { showModal, showModalTitle, showModalContent } = modalAction;
    openAddTask();
    showModal();
    showModalTitle('Add New Task');
    showModalContent(<TaskForm />);
  };

  onClickEdit = task => {
    const { taskAction, modalAction } = this.props;
    const { editTask } = taskAction;
    const { showModal, showModalTitle, showModalContent } = modalAction;
    editTask(task);
    showModal();
    showModalTitle('Edit Task');
    showModalContent(<TaskForm />);
  };

  handleRemove = task => {
    const { taskAction } = this.props;
    const { removeTask } = taskAction;
    // console.log(task);
    removeTask(task.id);
  };

  onClickRemove = task => {
    const { modalAction, classes } = this.props;
    const {
      showModal,
      showModalTitle,
      showModalContent,
      hideModal,
    } = modalAction;
    showModal();
    showModalTitle('Remove Task');
    showModalContent(
      <div className={classes.modalDelete}>
        <div className={classes.modalConfirmText} style={{ padding: 10 }}>
          Bạn có chắc chắn muốn xóa
          <span style={{ marginLeft: 10, fontWeight: 'bold' }}>
            {task.title}
          </span>
        </div>
        <Grid container>
          <Grid item sm={12} md={12}>
            <Box display="flex" flexDirection="row-reverse">
              <Button
                color="primary"
                ml={1}
                onClick={() => this.handleRemove(task)}
              >
                Confirm
              </Button>
              <Button color="secondary" ml={1} onClick={() => hideModal()}>
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </div>,
    );
  };

  renderBoard = classes => {
    let xhtml = null;
    // eslint-disable-next-line react/destructuring-assignment
    const { listTasks } = this.props;
    const data = listTasks.listTasks;

    xhtml = (
      <Grid container className={classes.mainLayout}>
        {STATUSES.map(status => {
          const taskFilter = data.filter(item => item.status === status.value);
          return (
            <TaskList
              tasks={taskFilter}
              status={status}
              key={status.value}
              onClickEdit={this.onClickEdit}
              onClickRemove={this.onClickRemove}
            />
          );
        })}
      </Grid>
    );

    return xhtml;
  };

  renderSearchBox = () => {
    let xhtml = null;
    xhtml = <SearchBox handleFilter={this.handleFilter} />;

    return xhtml;
  };
  // eslint-disable-next-line react/sort-comp
  componentDidMount() {
    // eslint-disable-next-line prefer-const
    let { taskAction } = this.props;
    // eslint-disable-next-line react/prop-types
    let { fetchListTask } = taskAction;
    fetchListTask();
  }

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
          Add New Task
        </Button>
        {this.renderSearchBox()}
        {this.renderBoard(classes)}
      </div>
    );
  }
}

TaskBoard.propTypes = {
  classes: PropTypes.object,
  taskAction: PropTypes.shape({
    fetchListTaskRequest: PropTypes.func,
    fetchSearchKeyWord: PropTypes.func,
    editTask: PropTypes.func,
    openAddTask: PropTypes.func,
    removeTask: PropTypes.func,
  }),
  listTasks: PropTypes.shape({
    listTasks: PropTypes.array,
  }),
  modalAction: PropTypes.shape({
    showModal: PropTypes.func,
    showModalTitle: PropTypes.func,
    showModalContent: PropTypes.func,
    hideModal: PropTypes.func,
  }),
};

const mapStateToProps = state => {
  return {
    listTasks: state.tasks,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    taskAction: bindActionCreators(taskAction, dispatch),
    modalAction: bindActionCreators(modalAction, dispatch),
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(TaskBoard),
);
