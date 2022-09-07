export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING',
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes,
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR',
    }
}

export const heroDeleting = () => {
    return {
        type: 'HERO_DELETING',
    }
}

export const heroDelete = (hero) => {
    return {
        type: 'HERO_DELETED',
        payload: hero,
    }
}

export const heroPosting = () => {
    return {
        type: 'HERO_POSTING',
    }
}

export const heroPosted = () => {
    return {
        type: 'HERO_POSTED',
    }
}

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING',
    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters,
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR',
    }
}