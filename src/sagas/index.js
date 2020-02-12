/* eslint-disable require-yield */

// eslint-disable-next-line spaced-comment
//Tạo 1 process mới
import {
  fork,
  take,
  call,
  put,
  delay,
  takeLatest,
  takeEvery,
  select,
} from 'redux-saga/effects';
import * as taskTypes from './../constants/tasks';
import {
  getList,
  addTask,
  updateTask as updateTaskApis,
  removeTask,
} from './../apis/tasks';
import { STATUS_CODE } from './../constants';
import {
  fetchListTaskSuccess,
  fetchListTaskFailed,
  fetchSearchKeyWordSuccess,
  addTaskSuccess,
  addTaskFailed,
  fetchListTask,
  updateTask,
  updateTaskSuccess,
  updateTaskFailed,
  removeTaskSuccess,
  removeTaskFailed,
} from '../actions/tasks';
import * as uiActions from './../actions/ui';
import { hideModal } from '../actions/modal';

// Thay thế helper fork bằng helper takeLatest => takeLatest là 1 helper blocking

// 2 tiến trình non-blocking không phụ thuộc nhau

// eslint-disable-next-line
function* watchFetchListTaskAction() {
  while (true) {
    // take là 1 blocking
    const actionFetchlist = yield take(taskTypes.FETCH_TASK);
    const { params } = actionFetchlist.payload;
    // Chỉ khi nào action được dispatch thì đoạn code ở dưới mới được thực thi
    yield put(uiActions.showLoading());
    try {
      const resp = yield call(getList, params);
      const { status, data } = resp;
      if (status === STATUS_CODE.SUCCESS) yield put(fetchListTaskSuccess(data));
    } catch (error) {
      yield put(fetchListTaskFailed(error));
    }
    yield delay(250);
    yield put(uiActions.hideLoading());
  }
}
// eslint-disable-next-line
// function* watchCreateTaskAction() {
//   console.log('Watching create task action');
// }

function* fetchSearchKeyword({ payload }) {
  yield delay(500);
  const { keyword } = payload;
  const queryString = { q: keyword };
  yield put(fetchListTask(queryString));
  // const listTasks = apisData.data;
  // let result = null;
  // result = listTasks.filter(task => {
  //   return task.title
  //     .trim()
  //     .toLowerCase()
  //     .includes(keyword.trim().toLowerCase());
  // });
  // yield put(fetchSearchKeyWordSuccess(apisData));
}

// eslint-disable-next-line
function* addData({ payload }) {
  const { title, description } = payload;
  try {
    const resp = yield call(addTask, {
      title,
      description,
      status: 0,
    });
    yield put(uiActions.showLoading());
    const { status, data } = resp;
    if (status === STATUS_CODE.CREATED) yield put(addTaskSuccess(data));
  } catch (error) {
    yield put(addTaskFailed(error));
  }
  yield delay(250);
  yield put(uiActions.hideLoading());
}

function* updateTaskFunction({ payload }) {
  const { title, description, status } = payload;
  const taskEditing = yield select(state => state.tasks.editTask);
  try {
    const reps = yield call(
      updateTaskApis,
      { title, description, status },
      taskEditing.id,
    );
    yield put(uiActions.showLoading());
    const { data, status: statusCode } = reps;
    if (statusCode === STATUS_CODE.SUCCESS) yield put(updateTaskSuccess(data));
  } catch (error) {
    yield put(updateTaskFailed(error));
  }
  yield delay(500);
  yield put(uiActions.hideLoading());
}

function* removeTaskFunction({ payload }) {
  const { taskId } = payload;
  try {
    const resp = yield call(removeTask, taskId);
    yield put(uiActions.showLoading());

    const { data, status } = resp;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(removeTaskSuccess(taskId));
      yield put(hideModal());
    }
  } catch (error) {
    yield put(removeTaskFailed(error));
  }
  yield delay(500);
  yield put(uiActions.hideLoading());
}

// eslint-disable-next-line
function* rootSaga() {
  yield fork(watchFetchListTaskAction);
  // yield fork(watchCreateTaskAction);
  yield takeEvery(taskTypes.FETCH_KEYWORD, fetchSearchKeyword);
  yield takeEvery(taskTypes.ADD_TASK, addData);
  yield takeEvery(taskTypes.UPDATE_TASK, updateTaskFunction);
  yield takeEvery(taskTypes.REMOVE_TASK, removeTaskFunction);
}

export default rootSaga;
