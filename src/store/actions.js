import { heroesFetching, heroesFetched, heroesFetchingError, heroDeleting, heroDelete, heroPosting, heroPosted } from "./heroesSlice/heroesSlice";
import { filtersFetching, filtersFetched, filtersFetchingError } from "./filtersSlice/filtersSlice";

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