import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import heroesReducer from '../reducers/heroes';
import filtersReducer from '../reducers/filters';

const sringMiddleWare = (store) => (dispatch) => (action) => {
    if (typeof action === 'string') {
        return dispatch({
            type: action,
        });
    }

    return dispatch(action);
}

const enhancer = (createStore) => (...args) => {
    const store = createStore(...args);
    const oldDispatch = store.dispatch;

    store.dispatch = (action) => {
        if (typeof action === 'string') {
            return oldDispatch({
                type: action,
            });
        }
        
        return oldDispatch(action);
    }

    return store;
}

const store = createStore(
    combineReducers({heroes: heroesReducer, filters: filtersReducer}),
    compose(
        applyMiddleware(sringMiddleWare),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
);

export default store;