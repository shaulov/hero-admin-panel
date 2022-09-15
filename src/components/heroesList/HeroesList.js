import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { fetchHeroes, deleteHero, filteredHeroesSelector } from '../../store/heroesSlice/heroesSlice';
import { useGetHeroesQuery } from '../../api/apiSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import './heroes-list.scss';

const HeroesList = () => {
    const {data: heroes = [], isFetching, isLoading, isSuccess, isError, error} = useGetHeroesQuery();
    const filteredHeroes = useSelector(filteredHeroesSelector);
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchHeroes());
        // eslint-disable-next-line
    }, []);

    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const onDeleteClick = (id) => {
        dispatch(deleteHero(id));
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={300}
                    classNames="card"
                >
                    <h5 className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>
                )
        }

        return arr.map((item) => {
            return (
                <CSSTransition 
                    key={item.id}
                    timeout={300}
                    classNames="card"
                > 
                    <HeroesListItem key={item.id} onDeleteClick={onDeleteClick} {...item}/>
                </CSSTransition>
            );
        })
    }

    const elements = renderHeroesList(heroes);
    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;