import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {useHttp} from '../../hooks/http.hook';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
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
    (id) => {
        const {request} = useHttp();
        return request(`http://localhost:3001/heroes/${id}`, 'DELETE') ;
    }
)

export const postHero = createAsyncThunk(
    'heroes/postHero',
    (formData) => {
        const {request} = useHttp();
        return request('http://localhost:3001/heroes', 'POST', JSON.stringify(formData));
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
            .addCase(deleteHero.fulfilled, (state, action) => {
                state.heroes = state.heroes.filter((hero) => hero.id !== action.meta.arg);
            })
            .addCase(postHero.fulfilled, (state, action) => {
                state.heroes.push(action.payload);
            })
            .addDefaultCase(() => {});
    },
});

const {reducer} = heroesSlice;

export default reducer;