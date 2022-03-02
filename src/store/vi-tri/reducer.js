import TaskActionTypes from './actionTypes';

const INIT_STATE = {
  tinh: [],
  khuVuc: [],
  quocGia: [],
  loading: false,
}

const ViTri = (state = INIT_STATE, action) => {
  switch (action.type) {
    case TaskActionTypes.LAY_DS_TINH:
    case TaskActionTypes.LAY_DS_KHU_VUC:
    case TaskActionTypes.LAY_DS_QUOC_GIA:
      return {
        ...state,
        loading: true,
      }

    case TaskActionTypes.LAY_DS_TINH_SUCCESS:
      return {
        ...state,
        tinh: action.payload.content,
        loading: false,
      }

    case TaskActionTypes.LAY_DS_KHU_VUC_SUCCESS:
      return {
        ...state,
        khuVuc: action.payload.content,
        loading: false,
      }

    case TaskActionTypes.LAY_DS_QUOC_GIA_SUCCESS:
      return {
        ...state,
        quocGia: action.payload.content,
        loading: false,
      }

      
    case TaskActionTypes.LAY_DS_TINH_FAIL:
    case TaskActionTypes.LAY_DS_KHU_VUC_FAIL:
    case TaskActionTypes.LAY_DS_QUOC_GIA_FAIL:

      return {
        ...state,
        loading: false,
      }

    default:
      return state
  }
}

export default ViTri
