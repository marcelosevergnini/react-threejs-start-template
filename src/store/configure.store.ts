import { createStore, applyMiddleware, compose, StoreEnhancer } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';

export default function configureStore(initialState = {}) {
    let composeEnhancers = compose;
    const reduxSagaMonitorOptions = {};

    const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

    const middleWares = [sagaMiddleware];

    const enhancers = [applyMiddleware(...middleWares)];

    type WindowWithDevTools = Window & {
        __REDUX_DEVTOOLS_EXTENSION__: () => StoreEnhancer<unknown, {}>
    }

    const isReduxDevtoolsExtensionExist =
        (arg: Window | WindowWithDevTools):
            arg is WindowWithDevTools  => {
            return  '__REDUX_DEVTOOLS_EXTENSION__' in arg;
        }

    const store = createStore(
        createReducer(),
        initialState,
        composeEnhancers(...enhancers, isReduxDevtoolsExtensionExist(window) ?
            window.__REDUX_DEVTOOLS_EXTENSION__() : undefined)
    );

    // store.runSaga = sagaMiddleware.run;
    // store.injectedReducers = {}; // Reducer registry
    // store.injectedSagas = {}; // Saga registry

    // Make reducers hot reloadable, see http://mxs.is/googmo
    /* istanbul ignore next */
    // if (module.hot) {
    //     module.hot.accept('./reducers', () => {
    //         store.replaceReducer(createReducer(store.injectedReducers));
    //     });
    // }

    return store;
}
