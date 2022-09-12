import { createReducer } from "@reduxjs/toolkit"
import { heroesFetching, heroesFetched, heroesFetchingError, heroDeleting, heroDelete, heroPosting, heroPosted } from '../actions';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

const heroes = createReducer(initialState, (builder) => {
    builder 
        .addCase(heroesFetching, (state) => {
            state.heroesLoadingStatus = 'loading';
        })
        .addCase(heroesFetched, (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload;
        })
        .addCase(heroesFetchingError, (state) => {
            state.heroesLoadingStatus = 'error';
        })
        .addCase(heroDeleting, (state) => {
            state.heroesLoadingStatus = 'loading';
        })
        .addCase(heroDelete, (state, action) => {
            state.heroes = state.heroes.filter((hero) => hero.id !== action.payload);
            state.heroesLoadingStatus = 'idle';
        })
        .addCase(heroPosting, (state) => {
            state.heroesLoadingStatus = 'loading';
        })
        .addCase(heroPosted, (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes.push(action.payload);
        })
        .addDefaultCase(() => {});
});

export default heroes;