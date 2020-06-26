import * as types from '../constants/modal';
const intitialState = {
  showModal: false,
  component: null,
  title: '',
};
const reducer = (state = intitialState, action) => {
  switch (action.type) {
    case types.SHOW_MODAL: {
      return {
        ...state,
        showModal: true,
      };
    }
    case types.HIDE_MODAL: {
      return {
        ...state,
        showModal: false,
        component: null,
        title: '',
      };
    }
    case types.CHANGE_MODAL_TITTLE: {
      const { title } = action.payload;
      return {
        ...state,
        title,
      };
    }
    case types.CHANGE_MODAL_CONTENT: {
      const { component } = action.payload;
      return {
        ...state,
        component,
      };
    }
    default:
      return state;
  }
};
export default reducer;
