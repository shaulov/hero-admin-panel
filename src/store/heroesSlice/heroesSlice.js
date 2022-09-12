import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    redicers: {
        heroesFetching: (state) => {
            state.heroesLoadingStatus = 'loading';
        },
        heroesFetched: (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload;
        },
        heroesFetchingError: (state) => {
            state.heroesLoadingStatus = 'error';
        },
        heroDeleting: (state) => {
            state.heroesLoadingStatus = 'loading';
        },
        heroDelete: (state, action) => {
            state.heroes = state.heroes.filter((hero) => hero.id !== action.payload);
            state.heroesLoadingStatus = 'idle';
        },
        heroPosting: (state) => {
            state.heroesLoadingStatus = 'loading';
        },
        heroPosted: (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes.push(action.payload);
        },
    },
});

const {actions, reducer} = heroesSlice;

export default reducer;

export const {heroesFetching, heroesFetched, heroesFetchingError, heroDeleting, heroDelete, heroPosting, heroPosted} = actions;