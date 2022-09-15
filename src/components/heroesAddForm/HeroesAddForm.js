import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import store from '../../store';
import { selectAll } from '../../store/filtersSlice/filtersSlice';
import { useCreateHeroMutation } from '../../api/apiSlice';
import Spinner from '../spinner/Spinner';

const HeroesAddForm = () => {
    const [formData, setFormData] = useState({
        id: uuidv4(),
        name: '',
        description: '',
        element: '',
    })
    const formRef = useRef(null);
    const [createHero, {isLoading}] = useCreateHeroMutation();
    const {filtersLoadingStatus} = useSelector(state => state.filters);
    const filters = selectAll(store.getState());

    if (isLoading) {
        return <Spinner/>;
    }

    const resetForm = () => {
        formRef.current.reset();
        setFormData({
            id: uuidv4(),
            name: '',
            description: '',
            element: '',
        });
    }

    const handleChange = (evt) => {
        const {value, name} = evt.target;
        setFormData({...formData, [name]: value,});
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        createHero(formData).unwrap();
        resetForm();
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
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="description" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="description" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    onChange={handleChange}
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