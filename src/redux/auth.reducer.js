import * as CONSTANT from './constant';

const initialState = {
  isWaiting: false,
  userData: {},
  isAuth: false,
  loginRole: false,
};

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case CONSTANT.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isWaiting: false,
        userData: action.data,
        isAuth: true,
        loginRole: 'master',
      });
    case CONSTANT.ASSISTANT_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isWaiting: false,
        userData: action.data,
        isAuth: true,
        loginRole: 'assistant',
      });

    case CONSTANT.LOGOUT_SUCCESS:
      return { ...initialState };

    default:
      return state;
  }
}
