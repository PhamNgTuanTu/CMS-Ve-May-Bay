import {
  XAC_NHAN_QUEN_MAT_KHAU,
  XAC_NHAN_QUEN_MAT_KHAU_SUCCESS,
  XAC_NHAN_QUEN_MAT_KHAU_ERROR,
  XAC_NHAN_MAT_KHAU_MOI_SUCCESS,
  XAC_NHAN_MAT_KHAU_MOI_ERROR
} from "./actionTypes"

const initialState = {
  response: {},
  error: ""
}

const QuyenMatKhau = (state = initialState, action) => {
  switch (action.type) {
    case XAC_NHAN_QUEN_MAT_KHAU_SUCCESS:
      state = {
        ...state,
        response: action.payload,
      }
      break
    case XAC_NHAN_MAT_KHAU_MOI_SUCCESS:
      state = {
        ...state,
        response: action.payload,
      }
      break
    case XAC_NHAN_QUEN_MAT_KHAU_ERROR:
      state = { ...state, error: action.payload }
      break
    case XAC_NHAN_MAT_KHAU_MOI_ERROR:
      state = { ...state, error: action.payload }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default QuyenMatKhau
