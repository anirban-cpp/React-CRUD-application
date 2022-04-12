import {
  take,
  takeEvery,
  takeLatest,
  put,
  call,
  fork,
  all,
  delay,
} from "redux-saga/effects";

import * as types from "./ActionTypes";
import {
  loadUsersSuccess,
  loadUsersError,
  createUserSuccess,
  createUserError,
  deleteUserError,
  deleteUserSuccess,
  updateUserSuccess,
  updateUserError,
} from "./Actions";
import { loadUsersApi, createUserApi, deleteUserApi, updateUserApi } from "./api";

function* onLoadUsersStartAsync() {
  try {
    const response = yield call(loadUsersApi);
    if (response.status === 200) {
      yield delay(500);
      yield put(loadUsersSuccess(response.data));
    }
  } catch (e) {
    yield put(loadUsersError(e.response.data));
  }
}

function* onCreateUsersStartAsync(action) {
  const { payload } = action;
  try {
    const response = yield call(createUserApi, payload);
    if (response.status === 201) {
      yield put(createUserSuccess(response.data));
    }
  } catch (e) {
    yield put(createUserError(e.response.data));
  }
}

function* onDeleteUserStartAsync(userId) {
  try {
    const response = yield call(deleteUserApi, userId);
    if (response.status === 200) {
      yield delay(500);
      yield put(deleteUserSuccess(userId));
    }
  } catch (e) {
    yield put(deleteUserError(e.response.data));
  }
}

function* onUpdateUsersStartAsync({ payload: {id, formValue} }) {
  try {
    const response = yield call(updateUserApi, id, formValue);
    if(response.status === 200 ){
      yield put(updateUserSuccess());
    }
  } catch (e) {
    yield put(updateUserError(e.response.data));
  }
}

function* onLoadUsers() {
  yield takeEvery(types.LOAD_USERS_START, onLoadUsersStartAsync);
}

function* onCreateUser() {
  yield takeLatest(types.CREATE_USER_START, onCreateUsersStartAsync);
}

function* onDeleteUser() {
  while (true) {
    const { payload: userId } = yield take(types.DELETE_USER_START); // take() only takes the action and not the saga action
    yield call(onDeleteUserStartAsync, userId);
  }
}

function* onUpdateUser() {
  yield takeLatest(types.UPDATE_USER_START, onUpdateUsersStartAsync);
}

const userSagas = [
  fork(onLoadUsers), // fork is used to manage the concurrency between different sagas
  fork(onCreateUser), // for concurrency between the sagas
  fork(onDeleteUser),
  fork(onUpdateUser),
];

export default function* rootSaga() {
  yield all([...userSagas]); // all is used to combine the different sagas
}
