import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './rootReducer'
import sagaMiddlewareFactory from 'redux-saga'
import rootSaga from './rootSaga'

const sagaMiddleware = sagaMiddlewareFactory()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
)

// FIXME: Remove in production
window.store = store

sagaMiddleware.run(rootSaga)

export default store
