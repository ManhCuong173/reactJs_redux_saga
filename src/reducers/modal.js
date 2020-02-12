import * as modalTypes from './../constants/modal';

const initialState = {
  showModal: false,
  title: '',
  component: null,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case modalTypes.SHOW_MODAL:
      return {
        ...state,
        showModal: true,
      };
    case modalTypes.HIDE_MODAL:
      return {
        ...state,
        showModal: false,
        title: '',
        component: null,
      };
    case modalTypes.CHANGE_MODAL_TITLE:
      // eslint-disable-next-line
      const { title } = action.payload;
      return {
        ...state,
        title,
      };
    case modalTypes.CHANGE_MODAL_CONTENT:
      // eslint-disable-next-line
      const { component } = action.payload;
      return {
        ...state,
        component,
      };
    default:
      return state;
  }
};

export default modalReducer;
