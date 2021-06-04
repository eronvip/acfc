import {
  call,
  put,
  takeLatest,
  select,
} from 'redux-saga/effects';

import {
  listAllCategoriesSuccess,
  listAllCategoriesFail,
  getIdCategorySuccess,
  getIdCategoryFail,
  addCategorySuccess,
  addCategoryFail,
  deleteCategoryFail,
  updateCategorySuccess,
  updateCategoryFail,
} from '../actionCreators/categoryActions';

import {
  getAllCategories,
  getIdCategory,
  addCategoryRequest,
  deleteCategoryRequest,
  patchCategoryRequest
} from '../services/categories';
// import { getToken } from '../apis/auth';

import * as categoryTypes from '../constants/category';

import { STATUS_CODE } from '../constants';

import { showLoading, hideLoading } from '../actionCreators/ui';

import { returnErrors } from '../actionCreators/errorActions';

function* getAllCategorySaga({ payload }) {
  yield put(showLoading());
  const token = ""; //yield call(getToken);
  console.log(payload);
  const resp = yield call(getAllCategories, token, payload);
  const { status, data } = resp;
  if (status === STATUS_CODE.SUCCESS) {
    yield put(listAllCategoriesSuccess(data, payload))
  } else {
    yield put(listAllCategoriesFail(data))
    yield put(returnErrors(data, status, 'LIST_ALL_CATEGORIES_FAIL'))
  }
  yield put(hideLoading());
}

function* getIdCategorySaga({ payload }) {
  yield put(showLoading());
  const token = ""; // yield call(getToken);
  const resp = yield call(getIdCategory, token, payload);
  const { status, data } = resp;
  if (status === STATUS_CODE.SUCCESS) {
    yield put(getIdCategorySuccess(payload))
  } else {
    yield put(getIdCategoryFail(payload))
    yield put(returnErrors(payload, status, 'GET_ID_CATEGORY_FAIL'))
  }
  yield put(hideLoading());
}

function* addCategorySaga({ payload }) {
  const token = ""; // yield call(getToken);
  yield put(showLoading());
  const resp = yield call(addCategoryRequest, token, payload);
  const { data, status } = resp;

  if (status === STATUS_CODE.SUCCESS) {
    yield put(addCategorySuccess(data));
  } else {
    yield put(addCategoryFail(data));
    yield put(returnErrors(data, status, 'ADD_CATEGORIES_FAIL'));
  }
  yield put(hideLoading());
}

function* deleteCategorySaga({ payload }) {
  const { _id } = payload;
  const token = "";// yield call(getToken);
  yield put(showLoading());
  const resp = yield call(deleteCategoryRequest, token, _id);
  const { data, status } = resp;
  if (status === STATUS_CODE.SUCCESS) {
    const _resp = yield call(getAllCategory, token, { params: {} });
    if (_resp.status === STATUS_CODE.SUCCESS) {
      yield put(listAllCategoriesSuccess(_resp.data))
    }
  } else {
    yield put(deleteCategoryFail(data));
    yield put(returnErrors(data, status, 'DELETE_CATEGORIES_FAIL'));
  }
  yield put(hideLoading());
}

function* updateCategorySaga({ payload }) {
  const token = "";// yield call(getToken);
  const categoryEdited = payload;
  const categoryEditting = yield select((state) => state.categories.categoryEditting);
  const { _id } = categoryEditting || categoryEdited;
  const categorySendReducer = { _id, ...categoryEdited }
  yield put(showLoading());
  const resp = yield call(
    patchCategoryRequest,
    token, _id, categoryEdited
  );
  const { data, status } = resp;
  if (status === STATUS_CODE.SUCCESS) {
    yield put(updateCategorySuccess(categorySendReducer));
  } else {
    yield put(updateCategoryFail(data));
    yield put(returnErrors(data, status, 'UPDATE_CATEGORIES_FAIL'));
  }
  yield put(hideLoading());
}

function* categorySaga() {
  yield takeLatest(categoryTypes.GET_ALL_CATEGORIES, getAllCategorySaga);
  yield takeLatest(categoryTypes.GET_ID_CATEGORY, getIdCategorySaga);
  yield takeLatest(categoryTypes.ADD_CATEGORY, addCategorySaga);
  yield takeLatest(categoryTypes.DELETE_CATEGORY, deleteCategorySaga);
  yield takeLatest(categoryTypes.UPDATE_CATEGORY, updateCategorySaga);
}

export default (categorySaga);
