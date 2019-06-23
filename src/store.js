import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './reducers/index'
const middleware = [thunk]
const initialState = {}
// redux tool: https://github.com/zalmoxisus/redux-devtools-extension#usage
const composeEnhancers =
    typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(...middleware),
    // other store enhancers if any
);
//export const store = createStore(rootReducer, initialState, applyMiddleware(...middleware))
export const store = createStore(rootReducer, initialState, enhancer)