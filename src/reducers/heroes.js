const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

const heroesReducer = (state = initialState, action) => {
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
            return {
                ...state,
                heroes: state.heroes.filter((hero) => hero.id !== action.payload),
                heroesLoadingStatus: 'idle',
            }
        case 'HERO_POSTING':
            return {
                ...state,
                heroesLoadingStatus: 'loading',
            }
        case 'HERO_POSTED':
            return {
                ...state,
                heroes: [...state.heroes, action.payload],
                heroesLoadingStatus: 'idle',
            }
        default: return state
    }
}

export default heroesReducer;