import { configureStore } from '@reduxjs/toolkit';
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';

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