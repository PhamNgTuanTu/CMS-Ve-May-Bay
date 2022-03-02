import {
  LAY_DS_NHAN_VIEN, 
  LAY_DS_NHAN_VIEN_FAIL,
  LAY_DS_NHAN_VIEN_SUCCESS,
  THEM_NHAN_VIEN,
  THEM_NHAN_VIEN_MESAGE,
  THEM_NHAN_VIEN_FAIL,
  NHAN_VIEN_CAP_NHAT,
  CAP_NHAT_NHAN_VIEN_MESAGE,
  CAP_NHAT_NHAN_VIEN_FAIL,
  XOA_NHAN_VIEN,
  XOA_NHAN_VIEN_FAIL,
  XOA_NHAN_VIEN_MESAGE,
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
  nhanVienCapNhat:{}
}

const NhanVien = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LAY_DS_NHAN_VIEN:
      return {
        ...state,
        params: action.payload,
      }
    case LAY_DS_NHAN_VIEN_SUCCESS:
      return {
        ...state,
        content:       action.payload.content,
        has_next:      action.payload.has_next,
        has_prev:      action.payload.has_prev,
        page:          action.payload.page,
        total_pages:   action.payload.total_pages,
        total_records: action.payload.total_records,
      }
    case LAY_DS_NHAN_VIEN_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case THEM_NHAN_VIEN_MESAGE:
      return {
        ...state,
        resApiActionForm: action.payload,
      }

    case THEM_NHAN_VIEN_FAIL:
      return {
        ...state,
        resApiActionForm: action.payload,
      }

    case NHAN_VIEN_CAP_NHAT:
      return {
        ...state,
        nhanVienCapNhat: action.payload,
        resApiActionForm: {},
      }
  
    case CAP_NHAT_NHAN_VIEN_MESAGE:
      return {
        ...state,
        resApiActionForm: action.payload,
      }

    case CAP_NHAT_NHAN_VIEN_FAIL:
      return {
        ...state,
        resApiActionForm: action.payload,
      }
   
    case XOA_NHAN_VIEN_MESAGE:
      return {
        ...state,
        resApiActionForm: action.payload
      }

    case XOA_NHAN_VIEN_FAIL:
      return {
        ...state,
        error: action.payload,
      }
     /*
    case XEM_CTIET_NHAN_VIEN:
      return {
        ...state,
        nhanVienIndex: state.danhSachNhanVien.map(nhanVien =>
          nhanVien.id.toString() === action.payload.id.toString()
            ? { nhanVien, ...action.payload }
            : nhanVien
        ),
      }

    case XEM_CTIET_NHAN_VIENL_SUCCESS:
      return {
        ...state,
        error: action.payload,
      }*/

    default:
      return state
  }
}

export default NhanVien
