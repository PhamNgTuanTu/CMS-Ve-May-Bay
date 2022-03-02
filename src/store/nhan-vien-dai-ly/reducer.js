import {
  LAY_DS_NHAN_VIEN_DL, 
  LAY_DS_NHAN_VIEN_DL_FAIL,
  LAY_DS_NHAN_VIEN_DL_SUCCESS,
  THEM_NHAN_VIEN_DL,
  THEM_NHAN_VIEN_DL_MESAGE,
  THEM_NHAN_VIEN_DL_FAIL,
  NHAN_VIEN_DL_CAP_NHAT,
  CAP_NHAT_NHAN_VIEN_DL_MESAGE,
  CAP_NHAT_NHAN_VIEN_DL_FAIL,
  XOA_NHAN_VIEN_DL,
  XOA_NHAN_VIEN_DL_FAIL,
  XOA_NHAN_VIEN_DL_MESAGE,
} from "./actionTypes"

const INIT_STATE = {
  content: [],
  has_next: false,
  has_prev: false,
  page: 1,
  total_pages:0,
  total_records:0,
  error: "",
  resApiActionForm:{},
  nhanVienDLCapNhat:{}
}

const NhanVienDL = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LAY_DS_NHAN_VIEN_DL:
      return {
        ...state,
        params: action.payload,
      }
    case LAY_DS_NHAN_VIEN_DL_SUCCESS:
      return {
        ...state,
        content:       action.payload.content,
        has_next:      action.payload.has_next,
        has_prev:      action.payload.has_prev,
        page:          action.payload.page,
        total_pages:   action.payload.total_pages,
        total_records: action.payload.total_records,
      }
    case LAY_DS_NHAN_VIEN_DL_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case THEM_NHAN_VIEN_DL_MESAGE:
      return {
        ...state,
        resApiActionForm: action.payload,
      }

    case THEM_NHAN_VIEN_DL_FAIL:
      return {
        ...state,
        resApiActionForm: action.payload,
      }

    case NHAN_VIEN_DL_CAP_NHAT:
      return {
        ...state,
        nhanVienDLCapNhat: action.payload,
        resApiActionForm: {},
      }
  
    case CAP_NHAT_NHAN_VIEN_DL_MESAGE:
      return {
        ...state,
        resApiActionForm: action.payload,
      }

    case CAP_NHAT_NHAN_VIEN_DL_FAIL:
      return {
        ...state,
        resApiActionForm: action.payload,
      }
   
    case XOA_NHAN_VIEN_DL_MESAGE:
      return {
        ...state,
        resApiActionForm: action.payload
      }

    case XOA_NHAN_VIEN_DL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default NhanVienDL
