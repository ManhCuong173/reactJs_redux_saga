import * as taskConstants from '../constants/tasks';
import * as taskApis from './../apis/tasks';
import * as STATUS from './../constants';

export const fetchListTask = (params = {}) => {
  return {
    type: taskConstants.FETCH_TASK,
    payload: {
      params,
    },
  };
};

export const fetchListTaskSuccess = data => {
  return {
    type: taskConstants.FETCH_TASK_SUCCESS,
    payload: {
      data,
    },
  };
};

export const fetchListTaskFailed = error => {
  return {
    type: taskConstants.FETCH_TASK_FAILED,
    payload: {
      error,
    },
  };
};

export const fetchSearchKeyWord = keyword => ({
  type: taskConstants.FETCH_KEYWORD,
  payload: {
    keyword,
  },
});

export const fetchSearchKeyWordSuccess = filteredTasks => ({
  type: taskConstants.FETCH_KEYWORD_SUCCESS,
  payload: {
    filteredTasks,
  },
});

export const openAddTask = () => ({
  type: taskConstants.SET_ADDING_TASK,
});

export const addTask = (title, description) => ({
  type: taskConstants.ADD_TASK,
  payload: {
    title,
    description,
  },
});

export const addTaskSuccess = newTask => ({
  type: taskConstants.ADD_TASK_SUCCESS,
  payload: {
    newTask,
  },
});

export const addTaskFailed = addTaskError => ({
  type: taskConstants.ADD_TASK_FAILED,
  payload: {
    addTaskError,
  },
});

export const editTask = task => ({
  type: taskConstants.SET_EDITING_TASK,
  payload: {
    task,
  },
});

export const updateTask = (
  title,
  description,
  status = STATUS.STATUSES[0].value,
) => ({
  type: taskConstants.UPDATE_TASK,
  payload: {
    title,
    description,
    status,
  },
});

export const updateTaskSuccess = updatedTask => ({
  type: taskConstants.UPDATE_TASK_SUCCESS,
  payload: {
    updatedTask,
  },
});

export const updateTaskFailed = updateTaskError => ({
  type: taskConstants.UPDATE_TASK_FAILED,
  payload: {
    updateTaskError,
  },
});

export const removeTask = taskId => ({
  type: taskConstants.REMOVE_TASK,
  payload: {
    taskId,
  },
});

export const removeTaskSuccess = removedTaskId => ({
  type: taskConstants.REMOVE_TASK_SUCCESS,
  payload: {
    removedTaskId,
  },
});

export const removeTaskFailed = removeTaskError => ({
  type: taskConstants.REMOVE_TASK_FAILED,
  payload: {
    removeTaskError,
  },
});

/**
 * Step 1: dispatch fecthListTask
 * Step 2: If fetch data success, dispatch fetchListTaskSuccess
 * Step 3: If not, disptach fecthListTaskFailed
 */

export const fetchListTaskRequest = () => {
  return dispatch => {
    dispatch(fetchListTask());
    taskApis
      .getList()
      .then(res => {
        const { data } = res;
        dispatch(fetchListTaskSuccess(data));
      })
      .catch(error => dispatch(fetchListTaskFailed(error)));
  };
};
