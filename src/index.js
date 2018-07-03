import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"; // Provider 就是给 connect 提供 store 用的
import { init } from "@rematch/core";
import * as models from './models/index';
import './assets/style.less';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

const store = init({
  models,
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
