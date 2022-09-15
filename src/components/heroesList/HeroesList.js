import { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { fetchHeroes, deleteHero } from '../../store/heroesSlice/heroesSlice';
import { useGetHeroesQuery } from '../../api/apiSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import './heroes-list.scss';

const HeroesList = () => {
    const {data: heroes = [], isLoading, isError} = useGetHeroesQuery();
    const activeFilter = useSelector(state => state.filters.activeFilter);
    const filteredHeroes = useMemo(
        () => {
            const filteredHeroes = heroes.slice();
            return activeFilter === 'all' ? filteredHeroes : filteredHeroes.filter((hero) => hero.element === activeFilter);
        },
        [heroes, activeFilter]
    );
    const dispatch = useDispatch();

    const onDeleteClick = useCallback((id) => {
        dispatch(deleteHero(id));
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        dispatch(fetchHeroes());
        // eslint-disable-next-line
    }, []);

    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
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

    const elements = renderHeroesList(filteredHeroes);
    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;