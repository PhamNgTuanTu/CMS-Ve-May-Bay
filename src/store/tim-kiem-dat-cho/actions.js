import TaskActionTypes from './actionTypes';

export const layDSDatCho = (params) => ({
  type: TaskActionTypes.LAY_DS_DAT_CHO,
  payload: params,
})

export const layDSDatChoSuccess = (response, id) => ({
  type: TaskActionTypes.LAY_DS_DAT_CHO_SUCCESS,
  payload: { data: response.data ? response.data : [], code: response.code, message: response.message, id: id },
})

export const layDSDatChoFail = thongBaoThatBai => ({
  type: TaskActionTypes.LAY_DS_DAT_CHO_FAIL,
  payload: thongBaoThatBai,
})

export const getID = id => ({
  type: TaskActionTypes.GET_ID_DAT_CHO,
  payload: id,
})