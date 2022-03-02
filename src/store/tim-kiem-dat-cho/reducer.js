import TaskActionTypes from './actionTypes';

const INIT_STATE = {
  resApi: {},
  content: [],
  id: 0,
  has_next: false,
  has_prev: false,
  page: 1,
  total_pages: 0,
  total_records: 0,
  loading: false,
}

const DanhSachDatCho = (state = INIT_STATE, action) => {
  switch (action.type) {
    case TaskActionTypes.LAY_DS_DAT_CHO:
      return {
        ...state,
        loading: true,
      }

    case TaskActionTypes.LAY_DS_DAT_CHO_SUCCESS:
      return {
        ...state,
        resApi: { action: 'tim-kiem-dat-cho', code: action.payload.code, message: action.payload.message, id: action.payload.id },
        content: action.payload.data.content,
        has_next: action.payload.data.has_next,
        has_prev:  action.payload.data.has_prev,
        page:  action.payload.data.page,
        total_pages:  action.payload.data.total_pages,
        total_records:  action.payload.data.total_records,
        loading: false,
      }

    case TaskActionTypes.GET_ID_DAT_CHO:
      return {
        ...state,
        id: action.payload,
        loading: false,
      }

    case TaskActionTypes.LAY_DS_DAT_CHO_FAIL:
      return {
        ...state,
        loading: false,
      }

    default:
      return state
  }
}

export default DanhSachDatCho
