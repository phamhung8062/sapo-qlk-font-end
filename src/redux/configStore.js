import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/index';
// hàm này có nhiệm vụ tạo ra một middleware năm giữa action và reducer trong redux
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHostReload: false,
      })
    : compose;

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();
const configureStore = () => {
  const middlewares = [thunk, sagaMiddleware, routerMiddleware(history)];
  const enhancers = [applyMiddleware(...middlewares)];
  const store = createStore(
    rootReducer(history),
    // rootReducer,
    composeEnhancers(...enhancers),
  );
  // hàm để chạy saga
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
