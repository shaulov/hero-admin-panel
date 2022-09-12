import { configureStore } from '@reduxjs/toolkit';
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

const store = configureStore({
    reducer: {heroesReducer, filtersReducer},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sringMiddleWare),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;