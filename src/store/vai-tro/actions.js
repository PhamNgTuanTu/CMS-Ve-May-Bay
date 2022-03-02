import TaskActionTypes from './actionTypes';

export const layDSVaiTro = (params) => ({
    type: TaskActionTypes.LAY_DS_VAI_TRO,
    payload: params,
  })
  
  export const layDSVaiTroSuccess = responseData => ({
    type: TaskActionTypes.LAY_DS_VAI_TRO_SUCCESS,
    payload: responseData,
  })
  
  export const layDSVaiTroFail = thongBaoThatBai => ({
    type: TaskActionTypes.LAY_DS_VAI_TRO_FAIL,
    payload: thongBaoThatBai,
  })