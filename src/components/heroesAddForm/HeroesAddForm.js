import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import store from '../../store';
import { postHero } from '../../store/heroesSlice/heroesSlice';
import { selectAll } from '../../store/filtersSlice/filtersSlice';
import Spinner from '../spinner/Spinner';

const HeroesAddForm = () => {
    const formRef = useRef(null);
    const inputNameRef = useRef(null);
    const selectRef = useRef(null);
    const textAreaRef = useRef(null);
    const {filtersLoadingStatus} = useSelector(state => state.filters);
    const filters = selectAll(store.getState());
    const dispatch = useDispatch();

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    }

    const resetForm = () => {
        formRef.current.reset();
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        const formData = {
            id: uuidv4(),
            name: inputNameRef.current.value,
            description: textAreaRef.current.value,
            element: selectRef.current.value,
        }

        try {
            await dispatch(postHero(formData))
                .then((response) => {
                    if (response.meta.requestStatus === 'fulfilled') {
                        resetForm();
                    }
                });
        } catch (err) {
            console.log(err);
        }
    }

    const renderFilters = (filters, status) => {
        if (status === 'loading') {
            return <option>Загрузка элементов...</option>
        }
        if (status === 'error') {
            return <option>Ошибка загрузки</option>
        }
        
        return filters.map(({name, label}) => {
            if (name === 'all') return null;

            return <option key={name} value={name}>{label}</option>
        })
    }

    return (
        <form 
            ref={formRef}
            className="border p-4 shadow-lg rounded"
            onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    ref={inputNameRef}
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="description" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    ref={textAreaRef}
                    name="description" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    ref={selectRef}
                    className="form-select" 
                    id="element" 
                    name="element"
                >
                        <option>Я владею элементом...</option>
                        {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;