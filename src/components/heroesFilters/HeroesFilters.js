import { useSelector, useDispatch } from 'react-redux';
import { useGetFiltersQuery } from '../../api/apiSlice';
import { activeFilterChanged } from '../../store/filtersSlice/filtersSlice';
import Spinner from '../spinner/Spinner';

const HeroesFilters = () => {
    const {filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const {data: filters = []} = useGetFiltersQuery();
    const dispatch = useDispatch();

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    }
    if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const handleFilterClick = (filterName) => {
        dispatch(activeFilterChanged(filterName));
    }

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>
        }

        return arr.map(({name, label, className}) => {
            const elementClass = `btn ${className} ${name === activeFilter ? 'active' : ''}`;
            return (
                <button 
                    key={name} 
                    className={elementClass}
                    onClick={() => handleFilterClick(name)}
                >
                    {label}
                </button>
            );
        })
    }

    const elements = renderFilters(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;