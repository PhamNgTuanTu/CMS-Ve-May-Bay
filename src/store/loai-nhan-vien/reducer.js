import TaskActionTypes from './actionTypes';

const INIT_STATE = {
  content: [],
  loading: false,
}

const LoaiNhanVien = (state = INIT_STATE, action) => {
  switch (action.type) {
    case TaskActionTypes.LAY_DS_LOAI_NHAN_VIEN:
      return {
        ...state,
        loading: true,
      }

    case TaskActionTypes.LAY_DS_LOAI_NHAN_VIEN_SUCCESS:
      return {
        ...state,
        content: action.payload.content,
        loading: false,
      }


    case TaskActionTypes.LAY_DS_LOAI_NHAN_VIEN_FAIL:
      return {
        ...state,
        loading: false,
      }

    default:
      return state
  }
}

export default LoaiNhanVien