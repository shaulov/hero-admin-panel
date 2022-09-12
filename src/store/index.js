import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
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

const store = createStore(
    combineReducers({heroes: heroesReducer, filters: filtersReducer}),
    compose(
        applyMiddleware(thunk, sringMiddleWare),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
);

export default store;