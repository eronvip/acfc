import * as categoryConstants from '../constants/category';

export const listAllCategories = (params = {}) => {
  return {
    type: categoryConstants.GET_ALL_CATEGORIES,
    payload: {
      params
    }
  }
}
export const listAllCategoriesSuccess = (data) => {
  return {
    type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
    payload: data,
  }
}
export const listAllCategoriesFail = (error) => {
  return {
    type: categoryConstants.GET_ALL_CATEGORIES_FAIL,
    payload: {
      error,
    }
  }
}

export const getIdCategory = (payload) => {
  return {
    type: categoryConstants.GET_ID_CATEGORY,
    payload
  }
}
export const getIdCategorySuccess = (payload) => {
  return {
    type: categoryConstants.GET_ID_CATEGORY_SUCCESS,
    payload
  }
}
export const getIdCategoryFail = (payload) => {
  return {
    type: categoryConstants.GET_ID_CATEGORY_FAIL,
    payload
  }
}
export const addCategory = (payload) => {
  return {
    type: categoryConstants.ADD_CATEGORY,
    payload,
  };
};

export const addCategorySuccess = (payload) => {
  return {
    type: categoryConstants.ADD_CATEGORY_SUCCESS,
    payload,
  };
};

export const addCategoryFail = (payload) => {
  return {
    type: categoryConstants.ADD_CATEGORY_FAIL,
    payload,
  };
};

export const deleteCategory = (payload) => {
  return {
    type: categoryConstants.DELETE_CATEGORY,
    payload,
  };
};

export const deleteCategorySuccess = (payload) => {
  return {
    type: categoryConstants.DELETE_CATEGORY_SUCCESS,
    payload,
  };
};

export const deleteCategoryFail = (payload) => {
  return {
    type: categoryConstants.DELETE_CATEGORY_FAIL,
    payload,
  };
};

export const updateCategory = (payload) => {
  return {
    type: categoryConstants.UPDATE_CATEGORY,
    payload,
  };
};
export const updateCategorySuccess = (payload) => {
  return {
    type: categoryConstants.UPDATE_CATEGORY_SUCCESS,
    payload,
  };
};

export const updateCategoryFail = (payload) => {
  return {
    type: categoryConstants.UPDATE_CATEGORY_FAIL,
    payload,
  };
};


export const setCategoryEditing = (category) => ({
  type: categoryConstants.SET_CATEGORY_EDITING,
  payload: {
    category,
  },
});