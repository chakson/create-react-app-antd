import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// import asyncComponent from './AsyncComponent';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import persistState from 'redux-sessionstorage';
import './assets/common.less';

import registerServiceWorker from './registerServiceWorker';
import commonReducer from './redux/index';

/****************** 基本路由配置 ****************** begin */
//------------- AuthPage 登录注册页 ---------------//
import LoginPage from './containers/authPage/Login';
//--------------- HomePage 主页 -------------//
import HomePage from './containers/HomePage';
//--------------- 访问的页面不存在 -------------//
import NoMatch from './components/NoMatch';
//--------------- UserManage 用户管理Pc界面 ---------------//
// import UserManage from './containers/userManage/UserManage';

export const history = createHistory(); // 其他地方有调用history实例，在这里导出
const middleware = routerMiddleware(history);
const store = createStore(
  combineReducers({
    router: routerReducer,
    commonReducer,
  }),
  persistState(),
  applyMiddleware(thunk, middleware),
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/homepage" component={HomePage} />
        <Route component={NoMatch}/>
      </Switch>
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
