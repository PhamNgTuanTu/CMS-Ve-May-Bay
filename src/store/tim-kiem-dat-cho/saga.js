//Include Both Helper File with needed methods
import { getDatCho } from "helpers/backend_helper";
import moment from "moment";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { layDSDatChoFail, layDSDatChoSuccess } from "./actions";
import TaskActionTypes from './actionTypes';


function* layDSDatCho({ payload: params }) {
  try {
    const response = yield call(getDatCho, params);
    console.log(response)
    var fakeid = moment(new Date()).format("YYYY-MM-DD hh mm ss");
    yield put(layDSDatChoSuccess(response, fakeid));
  } catch (error) {
    yield put(layDSDatChoFail(error))
  }
}


export function* getData() {
  yield takeLatest(TaskActionTypes.LAY_DS_DAT_CHO, layDSDatCho);
}


function* DatChoSaga() {
  yield all([
    call(getData),
  ]);
}

export default DatChoSaga
