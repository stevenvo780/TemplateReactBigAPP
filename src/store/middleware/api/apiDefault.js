import axios from 'axios';
import { CANCEL } from 'redux-saga';
import Cookies from 'js-cookie';
let client;
import { store } from '../../configureStore';
import {
  loading,
} from '../../reducer';

export const getSessionToken = () => {
  const uiStore = localStorage.getItem('store');
  var ui = JSON.parse(uiStore);
  if (ui) return ui.login.user.token;
  else return null;
};

// axios client factory ...
// useful in case we want to setup custom interceptors for e.g. regular token refresh etc...
function getClient() {
  if (!client) {
    client = axios.create({
      baseURL:
        process.env.REACT_APP_BACK_END + '/api' ||
        'http://localhost:3006' + '/api',
    });
    let calls = 0;
    client.interceptors.request.use(function (config) {
      calls++;
      store.dispatch(loading(true));
      return config;
    }, function (error) {
      calls++;
      store.dispatch(loading(true));
      console.error(error);
      return Promise.reject(error);
    });
    client.interceptors.response.use(function (response) {
      calls--;
      if (calls === 0) {
        store.dispatch(loading(false));
      }
      return response;
    }, function (error) {
      console.error(error);
      calls--;
      if (calls === 0) {
        store.dispatch(loading(false));
      }
      return Promise.reject(error);
    });
  }
  return client;
}
// pending requests if needed.
const callAPI = async (options) => {
  const token = getSessionToken();
  // returns a cancelable promise
  const cancel = axios.CancelToken.source();
  const opts = {
    ...options,
    cancelToken: cancel.token,
  };
  if (token) {
    opts.headers = {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    };
  } else {
    opts.headers = {
      Accept: 'application/json',
    };
  }
  const promise = getClient().request(opts);
  promise[CANCEL] = cancel.cancel;
  try {
    const result = await promise;
    return result;
  } catch (error) {
    if (error.request.status === 401) {
      Cookies.remove('session');
      localStorage.removeItem('store');
      window.location.href = '/login';
    }
    throw error;
  }
};

export function defaultApi(params) {
  return callAPI({
    method: 'GET',
    url: `/`,
    data: params,
  });
}