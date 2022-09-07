import {useHttp} from '../../hooks/http.hook';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { heroPosting, heroPosted } from '../../actions';
import Spinner from '../spinner/Spinner';

const HeroesAddForm = () => {
    const {heroesLoadingStatus, filters, filtersLoadingStatus} = useSelector(state => state);
    const [formData, setFormData] = useState({
        id: uuidv4(),
        name: '',
        description: '',
        element: '',
    });
    const formRef = useRef(null);
    const dispatch = useDispatch();
    const {request} = useHttp();

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    }

    const handleChange = (evt) => {
        const {value, name} = evt.target;
        setFormData({...formData, [name]: value,});
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();

        dispatch(heroPosting());
        request('http://localhost:3001/heroes', 'POST', JSON.stringify(formData))
            .then(() => {
                dispatch(heroPosted(formData));
                setFormData({
                    id: uuidv4(),
                    name: '',
                    description: '',
                    element: '',
                })
                formRef.reset();
            })
            .catch((err) => console.log(err));
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
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    onChange={handleChange}/>
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
                    onChange={handleChange}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={formData.element}
                    onChange={handleChange}>
                        <option>Я владею элементом...</option>
                        {renerFilters()}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;