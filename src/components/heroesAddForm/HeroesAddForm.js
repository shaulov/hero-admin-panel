import {useHttp} from '../../hooks/http.hook';
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { postHero } from '../../actions';
import Spinner from '../spinner/Spinner';

const HeroesAddForm = () => {
    const formRef = useRef(null);
    const inputNameRef = useRef(null);
    const selectRef = useRef(null);
    const textAreaRef = useRef(null);
    const {filters, filtersLoadingStatus} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const {request} = useHttp();

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    }

    const resetForm = () => {
        formRef.current.reset();
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();

        const formData = {
            id: uuidv4(),
            name: inputNameRef.current.value,
            description: textAreaRef.current.value,
            element: selectRef.current.value,
        }
        dispatch(postHero(request, formData, resetForm));
    }

    const renerFilters = () => {
        if (filtersLoadingStatus === 'loading') {
            return <option>Загрузка элементов...</option>
        }
        if (filtersLoadingStatus === 'error') {
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
                        {renerFilters()}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;