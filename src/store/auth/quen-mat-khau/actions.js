import {
  XAC_NHAN_QUEN_MAT_KHAU,
  XAC_NHAN_QUEN_MAT_KHAU_SUCCESS,
  XAC_NHAN_QUEN_MAT_KHAU_ERROR,
  XAC_NHAN_MAT_KHAU_MOI,
  XAC_NHAN_MAT_KHAU_MOI_SUCCESS,
  XAC_NHAN_MAT_KHAU_MOI_ERROR
} from "./actionTypes"

export const xacNhanQuenMatKhau = params => {
  return {
    type: XAC_NHAN_QUEN_MAT_KHAU,
    payload: params,
  }
}

export const xacNhanQuenMatKhauSuccess = (status, thongBao, id) => {
  return {
    type: XAC_NHAN_QUEN_MAT_KHAU_SUCCESS,
    payload: {status: status, message: thongBao, id: id},
  }
}

export const xacNhanQuenMatKhauError = message => {
  return {
    type: XAC_NHAN_QUEN_MAT_KHAU_ERROR,
    payload: message,
  }
}

export const xacNhanMatKhauMoi = params => {
  return {
    type: XAC_NHAN_MAT_KHAU_MOI,
    payload: params,
  }
}

export const xacNhanMatKhauMoiSuccess = (status, thongBao, id) => {
  return {
    type: XAC_NHAN_MAT_KHAU_MOI_SUCCESS,
    payload: {status: status, message: thongBao, id: id},
  }
}

export const xacNhanMatKhauMoiError = message => {
  return {
    type: XAC_NHAN_MAT_KHAU_MOI_ERROR,
    payload: message,
  }
}