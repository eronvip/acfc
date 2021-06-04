import * as categoryConstants from '../constants/category';
import {
  getWithToken,
  postWithToken,
  deleteWithToken,
  patchWithToken
} from '../utils/apiCaller';

export const getAllCategories = (token, data) => {
  const { params } = data;
  if (params.parentId) {
    return {
      status: 200,
      data: categoryConstants.DATA.filter(c => c.parentId === params.parentId)
    }
  } else {
    return {
      status: 200,
      data: categoryConstants.DATA
    }
  }
  // return getWithToken('api/categories', token, data).then(res => {
  //   return res;
  // }).catch(err => { return err.response });
}

export const getIdCategory = (token, id) => {
  return getWithToken('api/categories/' + id, token).then(res => {
    return res;
  }).catch(err => { return err.response });
}

export const addCategoryRequest = (token, data) => {
  return postWithToken('api/categories', token, data).then(res => {
    return res;
  }).catch(err => { return err.response });
}

export const deleteCategoryRequest = (token, id) => {
  return deleteWithToken('api/categories', token, id).then(res => {
    return res;
  }).catch(err => {
    return err.response
  });
}
export const patchCategoryRequest = (token, id, categoryEditting) => {
  return patchWithToken('api/categories', token, id, categoryEditting).then(res => {
    return res;
  }).catch(err => {
    return err.response
  });
}