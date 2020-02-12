/* eslint-disable no-case-declarations */
import * as taskConstants from '../constants/tasks';
import findIndex from './../helpers/findIndex';
import { toastError, toastSuccess } from './../helpers/toastHelper';

// eslint-disable-next-line prefer-const
const initialState = {
  listTasks: [],
  editTask: {},
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case taskConstants.FETCH_TASK:
      return { ...state, listTasks: [] };
    case taskConstants.FETCH_TASK_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const { data } = action.payload;
      return { ...state, listTasks: data };
    case taskConstants.FETCH_TASK_FAILED:
      // eslint-disable-next-line no-case-declarations
      const { error } = action.payload;
      toastError(error);
      return { ...state, listTasks: [] };
    case taskConstants.FETCH_KEYWORD_SUCCESS:
      // eslint-disable-next-line
      const { filteredTasks } = action.payload;
      return { ...state, listTasks: filteredTasks };
    case taskConstants.SET_ADDING_TASK:
      return { ...state, editTask: null };
    case taskConstants.ADD_TASK:
      return { ...state, editTask: { title: null, description: null } };
    case taskConstants.ADD_TASK_SUCCESS:
      // eslint-disable-next-line
      const { newTask } = action.payload;
      toastSuccess('Add task successfully !');
      return {
        ...state,
        listTasks: [newTask].concat(state.listTasks),
      };
    case taskConstants.ADD_TASK_FAILED:
      // eslint-disable-next-line
      const { addTaskError } = action.payload;
      toastError(addTaskError);
      return { ...state };
    case taskConstants.SET_EDITING_TASK:
      // eslint-disable-next-line
      const { task } = action.payload;
      return { ...state, editTask: task };
    case taskConstants.UPDATE_TASK:
      return { ...state };
    case taskConstants.UPDATE_TASK_SUCCESS:
      // eslint-disable-next-line
      const { updatedTask } = action.payload;
      const { listTasks } = state;
      const index = findIndex(listTasks, updatedTask);
      if (index !== -1) {
        const newArray = [
          ...listTasks.slice(0, index),
          updatedTask,
          ...listTasks.slice(index + 1),
        ];
        toastSuccess('Update task successfully !');
        return { ...state, listTasks: newArray };
      }
      return { ...state };
    case taskConstants.UPDATE_TASK_FAILED:
      const { updateTaskError } = action.payload;
      toastError(updateTaskError);
      return { ...state };
    case taskConstants.REMOVE_TASK:
      return { ...state };
    case taskConstants.REMOVE_TASK_SUCCESS:
      let indexResult = -1;
      const { removedTaskId } = action.payload;
      const { listTasks: listTasksState } = state;
      // eslint-disable-next-line
      for (let index = 0; index < listTasksState.length; index++) {
        const element = listTasksState[index];
        if (element.id === removedTaskId) {
          indexResult = index;
          break;
        }
      }
      if (indexResult !== -1) {
        const newArrayReturn = [
          ...listTasksState.splice(0, indexResult),
          ...listTasksState.splice(indexResult + 1),
        ];
        toastSuccess('Remove successfully');
        return { ...state, listTasks: newArrayReturn };
      }
      return { ...state };
    case taskConstants.REMOVE_TASK_FAILED:
      const { removeTaskError } = action.payload;
      toastError(removeTaskError);
      return { ...state };
    default:
      return state;
  }
};

export default appReducer;
