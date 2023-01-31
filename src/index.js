import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store/configureStore';
import App from './App';
//import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

if (process.env.REACT_APP_PROJECT_STATUS !== "development") {
  // optional: register service worker
  //serviceWorkerRegistration.register();
  reportWebVitals();
}


