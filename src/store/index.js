import { configureStore } from '@reduxjs/toolkit';
import filters from './filtersSlice/filtersSlice';
import { apiSlice } from '../api/apiSlice';

const sringMiddleWare = (store) => (dispatch) => (action) => {
    if (typeof action === 'string') {
        return dispatch({
            type: action,
        });
    }

    return dispatch(action);
}

const store = configureStore({
    reducer: {filters, [apiSlice.reducerPath]: apiSlice.reducer},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sringMiddleWare, apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;