import * as types from '../constants/category';
var initialState = {
  categories: [],
  loading: false,
  isCreateSuccess: false,
  categoryEditting: null,
}
var myReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.GET_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        loading: false
      }
    case types.GET_ID_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.payload
      }
    case types.ADD_CATEGORY:
      return {
        ...state,
      }
    case types.ADD_CATEGORY_SUCCESS: {
      const data = action.payload;
      console.log('Thêm mới category thành công thành công!')
      return {
        ...state,
        categories: [data, ...state.categories]
      };
    }
    case types.ADD_CATEGORY_FAIL: {
      const error = action.payload;
      console.log(error);
      return {
        ...state,
      };
    }
    case types.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: [...state.categorys.filter(category => category._id !== action.payload)]
      }
    case types.SET_CATEGORY_EDITING: {
      const { category } = action.payload;
      return {
        ...state,
        categoryEditting: category
      };
    }
    case types.UPDATE_CATEGORY: {
      return {
        ...state
      };
    }
    case types.UPDATE_CATEGORY_SUCCESS: {
      const categoryEditting = action.payload;
      const { categories } = state;
      const index = categories.findIndex((item) => item._id === categoryEditting._id);
      if (index !== -1) {
        const newList = [
          ...categories.slice(0, index),
          categoryEditting,
          ...categories.slice(index + 1)
        ];
        // toastSuccess('Cập nhật Work Order thành công')
        return {
          ...state,
          categories: newList
        };
      }
      return { ...state }
    }
    case types.UPDATE_CATEGORY_FAIL: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state
      };
    }
    default: return state;
  }
}
export default myReducer;