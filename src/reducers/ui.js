import * as uiTypes from './../constants/ui';

const initialState = {
  showLoading: false,
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case uiTypes.SHOW_LOADING:
      return {
        ...state,
        showLoading: true,
      };
    case uiTypes.HIDE_LOADING:
      return {
        ...state,
        showLoading: false,
      };
    default:
      return state;
  }
};

export default uiReducer;
