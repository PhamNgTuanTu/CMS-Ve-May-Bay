import { call, put, takeLatest,all } from "redux-saga/effects"
import moment from "moment";
// Crypto Redux States
import {
  layDSVaiTroSuccess, layDSVaiTroFail
} from "./actions"

import TaskActionTypes from './actionTypes';

//Include Both Helper File with needed methods
import {getVaiTro} from "helpers/backend_helper"

function* layDSVaiTro({ payload: params }) {
  try {
    const response = yield call(getVaiTro);
    // console.log(response)
    yield put(layDSVaiTroSuccess(response.data));
  } catch (error) {
    yield put(layDSVaiTroFail(error))
  }
}

export function* getData() {
  yield takeLatest(TaskActionTypes.LAY_DS_VAI_TRO, layDSVaiTro);
}


function* VaiTroSaga() {
  yield all([
    call(getData),
  ]);
}

export default VaiTroSaga
