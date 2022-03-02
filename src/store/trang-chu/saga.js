//Include Both Helper File with needed methods
import { getMonthlyData, getWeeklyData, getYearlyData } from "helpers/backend_helper";
import { all, call, put, takeLatest } from "redux-saga/effects";
// Crypto Redux States
import {
  getChartsDataFail, getChartsDataSuccess,
  getOrdersSuccess, getOrdersFail
} from "./actions";
import TaskActionTypes from './actionTypes';

import {
  monthData,
  weekData, yearData, orders
} from "../../common/data";

function* getChartsData({ payload: periodType }) {
  try {
    var response;
    if (periodType == "monthly") {
      // response = yield call(getWeeklyData, periodType);
      response = monthData;

    }
    if (periodType == "yearly") {
      // response = yield call(getYearlyData, periodType);
      response = yearData;

    }
    if (periodType == "weekly") {
      // response = yield call(getMonthlyData, periodType);
      response = weekData;

    }
    yield put(getChartsDataSuccess(response));
  } catch (error) {
    yield put(getChartsDataFail(error));
  }
}

function* fetchOrders() {
  try {
    // const response = yield call(getOrders)
    var response = orders;
    yield put(getOrdersSuccess(response))
  } catch (error) {
    yield put(getOrdersFail(error))
  }
}

export function* getDataChart() {
  yield takeLatest(TaskActionTypes.GET_CHARTS_DATA, getChartsData);
}
export function* getDataOrder() {
  yield takeLatest(TaskActionTypes.GET_ORDERS, fetchOrders);
}


function* DashBoardSaga() {
  yield all([
    call(getDataChart),
    call(getDataOrder),
  ]);
}

export default DashBoardSaga
