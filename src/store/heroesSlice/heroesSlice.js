import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit"
import {useHttp} from '../../hooks/http.hook';

const heroesAdapter = createEntityAdapter();
const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle',
});

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
                heroesAdapter.setAll(state, action.payload);
            })
            .addCase(fetchHeroes.rejected, (state) => {
                state.heroesLoadingStatus = 'error';
            })
            .addCase(deleteHero.fulfilled, (state, action) => {
                heroesAdapter.removeOne(state, action.meta.arg);
            })
            .addCase(postHero.fulfilled, (state, action) => {
                heroesAdapter.addOne(state, action.payload);
            })
            .addDefaultCase(() => {});
    },
});

const {reducer} = heroesSlice;

const {selectAll} = heroesAdapter.getSelectors(state => state.heroes);
export const filteredHeroesSelector = createSelector(
    selectAll,
    (state) => state.filters.activeFilter,
    (heroes, activeFilter) => activeFilter === 'all' ? heroes : heroes.filter((hero) => hero.element === activeFilter),
);

export default reducer;