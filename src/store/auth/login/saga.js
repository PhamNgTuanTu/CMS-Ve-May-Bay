import { call, put, takeEvery, takeLatest } from "redux-saga/effects"

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN, LOGOUT_USER_SUCCESS } from "./actionTypes"
import { apiError, loginSuccess, logoutUserSuccess } from "./actions"
import {
  postDangNhap
} from "../../../helpers/backend_helper"



function* loginUser({ payload: { user, history } }) {
  try {
    const  response = yield call(postDangNhap, user)
    console.log(response);
    yield put(loginSuccess(response.code, response.message));
    if(response.code === 200){
      sessionStorage.setItem("token", response.data.access_token);
      sessionStorage.setItem("refresh_token", response.data.refresh_token);
      sessionStorage.setItem("token_expired", response.data.token_expired);
      sessionStorage.setItem("tai_khoan", JSON.stringify(response.data.tai_khoan));
      history.push("/")
    }
    
  } catch (error) {
   
    yield put(apiError(error))
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    sessionStorage.setItem("token", "");
    sessionStorage.setItem("token_expired", 0);
    sessionStorage.setItem("refresh_token", "");
    sessionStorage.setItem("tai_khoan", "");
    history.push("/dang-nhap");
    yield put(loginSuccess(response.code, response.message));
    logoutUserSuccess(LOGOUT_USER_SUCCESS)
  } catch (error) {
    yield put(apiError(error))
  }
}


function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeEvery(LOGOUT_USER, logoutUser)
}

export default authSaga
