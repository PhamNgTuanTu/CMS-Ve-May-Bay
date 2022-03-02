import TaskActionTypes from './actionTypes';

export const layDSLoaiNhanVien = (params) => ({
    type: TaskActionTypes.LAY_DS_LOAI_NHAN_VIEN,
    payload: params,
  })
  
  export const layDSLoaiNhanVienSuccess = responseData => ({
    type: TaskActionTypes.LAY_DS_LOAI_NHAN_VIEN_SUCCESS,
    payload: responseData,
  })
  
  export const layDSLoaiNhanVienFail = thongBaoThatBai => ({
    type: TaskActionTypes.LAY_DS_LOAI_NHAN_VIEN_FAIL,
    payload: thongBaoThatBai,
  })