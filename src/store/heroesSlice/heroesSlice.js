import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {useHttp} from '../../hooks/http.hook';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    heroDeletingStatus: 'idle',
}

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    async () => {
        const {request} = useHttp();
        return await request('http://localhost:3001/heroes');
    }
);

export const deleteHero = createAsyncThunk(
    'heroes/deleteHero',
    async (id) => {
        const {request} = useHttp();
        return await request(`http://localhost:3001/heroes/${id}`, 'DELETE') ;
    }
)

export const postHero = createAsyncThunk(
    'heroes/postHero',
    async (formData) => {
        const {request} = useHttp();
        return await request('http://localhost:3001/heroes', 'POST', JSON.stringify(formData));
    }
);

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, (state) => {
                state.heroesLoadingStatus = 'loading';
            })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                state.heroes = action.payload;
            })
            .addCase(fetchHeroes.rejected, (state) => {
                state.heroesLoadingStatus = 'error';
            })
            .addCase(deleteHero.pending, (state) => {
                state.heroDeletingStatus = 'loading';
            })
            .addCase(deleteHero.fulfilled, (state, action) => {
                state.heroDeletingStatus = 'idle';
                state.heroes = state.heroes.filter((hero) => hero.id !== action.payload);
            })
            .addCase(deleteHero.rejected, (state) => {
                state.heroDeletingStatus = 'error';
            })
            .addCase(postHero.pending, (state) => {
                state.heroesLoadingStatus = 'loading';
            })
            .addCase(postHero.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                state.heroes.push(action.payload);
            })
            .addDefaultCase(() => {});
    },
});

const {reducer} = heroesSlice;

export default reducer;