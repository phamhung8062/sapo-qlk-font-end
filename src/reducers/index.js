import { combineReducers } from 'redux';
import uiReducer from './ui';
import modalReducer from './modal';
import authReducer from './auth';
import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router';
import receiptReducer from './receipt';
import NavigationReducer from './NavigationReducer';
import supplierReducer from './supplier';

const rootReducer = (history) =>
  combineReducers({
    ui: uiReducer,
    modal: modalReducer,
    receipt: receiptReducer,
    supplier: supplierReducer,
    form: formReducer,
    auth: authReducer,
    router: connectRouter(history),
    navigations: NavigationReducer,
  });
export default rootReducer;
