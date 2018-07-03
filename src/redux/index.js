import { combineReducers } from 'redux';

import login from './auth.reducer';

const commonReducer = combineReducers({
  login,
});

export default commonReducer;
