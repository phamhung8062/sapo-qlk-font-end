import * as types from '../constants/ui';
const intitialState = {
  showLoading: false,
  showSidebar: true,
};
const reducer = (state = intitialState, action) => {
  switch (action.type) {
    case types.SHOW_LOADING: {
      return {
        ...state,
        showLoading: true,
      };
    }
    case types.HIDE_LOADING: {
      return {
        ...state,
        showLoading: false,
      };
    }
    case types.SHOW_SIDEBAR: {
      return {
        ...state,
        showSidebar: true,
      };
    }
    case types.HIDE_SIDEBAR: {
      return {
        ...state,
        showSidebar: false,
      };
    }
    default:
      return state;
  }
};
export default reducer;
