import {
  takeLatest,
  put,
  call,
  cancelled,
} from 'redux-saga/effects';
import { apiDefault } from './api';
import {
  defaultAction,
  defaultDoneAction,
  defaultError,
} from '../reducer';

// Example remove session and restore session
/*
import { LOCATION_CHANGE } from 'redux-first-history';
import Cookies from 'js-cookie';
import { push } from 'redux-first-history';
*/

function* defaultSagas(action) {
  try {
    const { data } = yield call(apiDefault.defaultApi, action.payload);
    if (data) {
      yield put(defaultDoneAction(data));
    } else {
      yield put(defaultError(error.message));
    }
  } catch (error) {
    console.error(error);
    yield put(defaultError(error.message));
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}
// Example restore session
// function* restoreSessionStateSaga(action) {
//   const lastRoute = window.location.pathname;
//   try {
//     yield put(push(lastRoute));
//   } catch (error) {
//     console.error(error);
//   } finally {
//     if (yield cancelled()) {
//       // Do nothing
//     }
//   }
// }
// Example remove session
// function* logoutSagas(action) {
//   try {
//     yield put(cleanSessionStateAction());
//     localStorage.removeItem('ordersProduct');
//     Cookies.remove('session');
//   } catch (error) {
//     console.error(error);
//   } finally {
//     if (yield cancelled()) {
//       // Do nothing
//     }
//   }
// }


export function* rootSaga() {
  yield takeLatest(defaultAction.type, defaultSagas);
  // Example restore session
  // yield takeLatest(LOCATION_CHANGE, restoreSessionStateSaga);

}
