import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import uiReducer from './ui';
import categories from './category';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  ui: uiReducer,
  form: formReducer,
  error: errorReducer,
  categories
});

export default rootReducer;
