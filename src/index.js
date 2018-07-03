import React from 'react';
import ReactDOM from 'react-dom';
import './assets/style.less';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
