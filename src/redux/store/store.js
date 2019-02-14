import { createStore, applyMiddleware, compose } from "redux";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import rootReducer from "../reducers/rootReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/rootSagas";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const Store = (initialState = {}) => {
  const history = createBrowserHistory();

  const middleware = [routerMiddleware(history), sagaMiddleware];

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


  const Store = createStore(
    connectRouter(history)(rootReducer),
    composeEnhancers(applyMiddleware(...middleware))
  );

  // run the saga
  sagaMiddleware.run(rootSaga);
  
  return {
    Store,
    history
  };
};

export default Store;
