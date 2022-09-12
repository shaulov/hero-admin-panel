import { configureStore } from '@reduxjs/toolkit';
import heroes from './heroesSlice/heroesSlice';
import filters from './filtersSlice/filtersSlice';

const sringMiddleWare = (store) => (dispatch) => (action) => {
    if (typeof action === 'string') {
        return dispatch({
            type: action,
        });
    }

    return dispatch(action);
}

const store = configureStore({
    reducer: {heroes, filters},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sringMiddleWare),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;