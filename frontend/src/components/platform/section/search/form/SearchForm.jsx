import React from "react";
import {SearchFields} from "../../../../../utils/SearchData.js";
import {useSearchFormData} from "../../../../../utils/SearchData.js";
import {useForm} from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import {Context} from "../../../../../api/store/storeContext.js";
import CountrySelect from "../../../components/CountrySelect.jsx";
import {SearchSchema} from "../../../components/validation/SearchSchema.js";
import FormTitle from "./FormTitle.jsx";
import {NameData} from "../../../../../utils/NameData.js";

function usePrevious(value) {
    const ref = React.useRef();
    React.useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}

const SearchForm = ({checked, setChecked}) => {
    const {store} = React.useContext(Context);
    const fund_name = store.user?.backer?.fund_for_search;
    const [formData, setFormData] = useSearchFormData();
    //const [checked, setChecked] = React.useState(false);
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
        formState: { errors },
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

    const prevChecked = usePrevious(checked);

    React.useEffect(() => {

        if (prevChecked === true && checked === false) {

            if (store.clearResult) {
                store.clearResult();
            } else {

                store.result = null;
            }
        }
    }, [checked, prevChecked, store]);

    console.log(fund_name);

    const submitForm = async () => {
        if (!formData.last_name && !formData.discord && !formData.nickname) {
            const errorMessage = 'Заполните хотя бы одно из полей: Фамилия, Discord или Ник в руме';
            setError('last_name', { type: 'manual', message: errorMessage });
            setError('discord', { type: 'manual', message: errorMessage });
            setError('nickname', { type: 'manual', message: errorMessage });
            return;
        }

        const tooShort =
            (formData.last_name && formData.last_name.length < 3) ||
            (formData.discord && formData.discord.length < 3) ||
            (formData.nickname && formData.nickname.length < 3);

        if (tooShort) {
            const shortMessage = 'Минимальная длина для поиска — 3 символа';
            if (formData.last_name && formData.last_name.length < 3)
                setError('last_name', { type: 'manual', message: shortMessage });
            if (formData.discord && formData.discord.length < 3)
                setError('discord', { type: 'manual', message: shortMessage });
            if (formData.nickname && formData.nickname.length < 3)
                setError('nickname', { type: 'manual', message: shortMessage });
            return;
        }

        // Проверка last_name на вхождение в NameData без учета регистра
        if (
            formData.last_name &&
            NameData.some((name) => name.toLowerCase() === formData.last_name.toLowerCase())
        ) {
            setError('last_name', { type: 'manual', message: 'Укажите фамилию для поиска' });
            return;
        }

        const searchData = { ...formData };


        if (checked) {
            searchData.fund_name = fund_name;
        }

        console.log(searchData);

        await store.search(searchData);
        reset()
    }

    return (
        <search role="search" className="search__container">
            <FormTitle fundName={fund_name} checked={checked} setChecked={setChecked} />
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
                    <div className="search">
                        <label htmlFor="phoneNumber" className="search__label">
                            Номер телефона
                        </label>
                        <CountrySelect onPhoneNumberChange={handlePhoneNumberChange}/>
                    </div>
                </div>

                <button type="submit" className="search__btn">
                    Найти игрока
                </button>
            </form>
        </search>
    );
};

export default SearchForm;