import React from "react";
import {SearchFields} from "../../../../utils/SearchData.js";
import {useSearchFormData} from "../../../../utils/SearchData.js";
import {useForm} from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import {Context} from "../../../../api/store/storeContext.js";
import CountrySelect from "./CountrySelect.jsx";
import {SearchSchema} from "../../components/validation/SearchSchema.js";

const SearchForm = () => {
    const {store} = React.useContext(Context);
    const [formData, setFormData] = useSearchFormData();
    const topFields = SearchFields.slice(0, 3);
    const bottomFields = SearchFields.slice(3);

    const handlePhoneNumberChange = React.useCallback((phoneNumber) => {
        setFormData((prevData) => ({...prevData, phonenumber: phoneNumber}));
    }, [setFormData]);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        setError,
        formState: { errors,isSubmitting },
    } = useForm({
        resolver: yupResolver(SearchSchema),
        mode: 'onChange',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setValue(name, value);
    };

    const submitForm = async (formData) => {
        if (!formData.last_name && !formData.discord && !formData.nickname) {
            const errorMessage = 'Заполните хотя бы одно из полей: Фамилия, Discord или Ник в руме';
            setError('last_name', { type: 'manual', message: errorMessage });
            setError('discord', { type: 'manual', message: errorMessage });
            setError('nickname', { type: 'manual', message: errorMessage });
            return;
        }

        await store.search(formData);
        console.log(formData);
        reset()
    }

    console.log(formData);

    return (
        <form method="POST" className="search__wrapper" autoComplete="off" onSubmit={handleSubmit(submitForm)}>
            <div className="search__box">
                {topFields.map((field) => (
                    <div className="search" key={field.name}>
                        <label className="search__label" htmlFor={field.id}>
                            {field.label}
                        </label>
                        <input
                            {...register(field.name)}
                            onChange={handleChange}
                            value={formData[field.name] || ''}
                            className="search__input"
                            id={field.id}
                            type="text"
                            name={field.name}
                            placeholder={field.placeholder}
                        />
                        {errors[field.name] && (
                            <span className="search__error-message" aria-live="polite">
                                {errors[field.name]?.message}
                            </span>
                        )}
                    </div>
                ))}
            </div>
            <div className="search__box-bottom">
                {bottomFields.map((field) => (
                    <div className="search" key={field.name}>
                        <label className="search__label" htmlFor={field.id}>
                            {field.label}
                        </label>
                        <input
                            {...register(field.name)}
                            onChange={handleChange}
                            value={formData[field.name] || ''}
                            className="search__input"
                            id={field.id}
                            type="text"
                            name={field.name}
                            placeholder={field.placeholder}
                        />
                        {errors[field.name] && (
                            <span className="search__error-message" aria-live="polite">
                                {errors[field.name]?.message}
                            </span>
                        )}
                    </div>
                ))}
                <CountrySelect onPhoneNumberChange={handlePhoneNumberChange}/>
            </div>

            <button type="submit" className="search__btn">
                Найти игрока
            </button>
        </form>
    );
};

export default SearchForm;