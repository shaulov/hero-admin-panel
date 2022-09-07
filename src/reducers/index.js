const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
    filteredHeroes: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading',
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle',
                filteredHeroes: action.payload,
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error',
            }
        case 'HERO_DELETING':
            return {
                ...state,
                heroesLoadingStatus: 'loading',
            }
        case 'HERO_DELETED':
            const newDeletedHeroesList = state.heroes.filter((hero) => hero.id !== action.payload);
            return {
                ...state,
                heroes: newDeletedHeroesList,
                filteredHeroes: state.activeFilter === 'all' ? newDeletedHeroesList: newDeletedHeroesList.filter((hero) => hero.element === state.activeFilter),
                heroesLoadingStatus: 'idle',
            }
        case 'HERO_POSTING':
            return {
                ...state,
                heroesLoadingStatus: 'loading',
            }
        case 'HERO_POSTED':
            const newPostedHeroesList = [...state.heroes, action.payload];
            return {
                ...state,
                heroes: newPostedHeroesList,
                heroesLoadingStatus: 'idle',
                filteredHeroes: state.activeFilter === 'all' ? newPostedHeroesList: newPostedHeroesList.filter((hero) => hero.element === state.activeFilter),
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading',
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filtersLoadingStatus: 'idle',
                filters: action.payload,
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error',
            }
        case 'ACTIVE_FILTER_CHANGED':
            return {
                ...state,
                activeFilter: action.payload,
                filteredHeroes: action.payload === 'all' ? state.heroes: state.heroes.filter((hero) => hero.element === action.payload),
            }
        default: return state
    }
}

export default reducer;