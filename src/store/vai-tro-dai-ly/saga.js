import { call, put, takeLatest, all } from "redux-saga/effects"
import moment from "moment";
// Crypto Redux States
import {
  layDSVaiTroDaiLySuccess, layDSVaiTroDaiLyFail
} from "./actions"

import TaskActionTypes from './actionTypes';

//Include Both Helper File with needed methods
import { getVaiTroDaiLy } from "helpers/backend_helper"

function* layDSVaiTroDaiLy({ payload: params }) {
  try {
    const response = yield call(getVaiTroDaiLy);
    console.log(response.data)
    yield put(layDSVaiTroDaiLySuccess(response.data));
  } catch (error) {
    yield put(layDSVaiTroDaiLyFail(error))
  }
}

export function* getData() {
  yield takeLatest(TaskActionTypes.LAY_DS_VAI_TRO_DAI_LY, layDSVaiTroDaiLy);
}


function* VaiTroDaiLySaga() {
  yield all([
    call(getData),
  ]);
}

export default VaiTroDaiLySaga
