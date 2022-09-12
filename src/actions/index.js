import { createAction } from "@reduxjs/toolkit";

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

export const heroesFetching = createAction('HEROES_FETCHING');

export const heroesFetched = createAction('HEROES_FETCHED');

export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');

export const heroDeleting = createAction('HERO_DELETING');

export const heroDelete = createAction('HERO_DELETED');

export const heroPosting = createAction('HERO_POSTING');

export const heroPosted = createAction('HERO_POSTED');

export const filtersFetching = createAction('FILTERS_FETCHING');

export const filtersFetched = createAction('FILTERS_FETCHED');

export const filtersFetchingError = createAction('FILTERS_FETCHING_ERROR');

export const activeFilterChanged = createAction('ACTIVE_FILTER_CHANGED');