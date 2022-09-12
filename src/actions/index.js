export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request('http://localhost:3001/heroes')
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()));
}

export const deleteHero = (request, id) => (dispatch) => {
    dispatch(heroDeleting());
    request(`http://localhost:3001/heroes/${id}`, 'DELETE')
        .then(dispatch(heroDelete(id)))
        .catch((err) => console.log(err));
}

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request('http://localhost:3001/filters')
        .then((data) => dispatch(filtersFetched(data)))
        .catch(dispatch(filtersFetchingError()));
}

export const postHero = (request, formData, successCallback) => (dispatch) => {
    dispatch(heroPosting());
        request('http://localhost:3001/heroes', 'POST', JSON.stringify(formData))
            .then(() => {
                dispatch(heroPosted(formData));
                successCallback();
            })
            .catch((err) => console.log(err));
}

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

export const heroPosted = (hero) => {
    return {
        type: 'HERO_POSTED',
        payload: hero,
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

export const activeFilterChanged = (filter) => {
    return {
        type: 'ACTIVE_FILTER_CHANGED',
        payload: filter,
    }
}