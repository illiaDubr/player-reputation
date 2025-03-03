import * as yup from 'yup';

const regExpEmail = /^\S+@\S+\.\S+$/;
//const regExpPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const commonPasswords = ['12345678', 'password', 'qwerty', 'abc123'];

export const schemaAuth = yup.object().shape({
    email: yup
        .string()
        .trim()
        .required('Обязательное поле')
        .max(255, 'Email не должен превышать 255 символов')
        .matches(regExpEmail, 'Неверный формат почты')
        .lowercase('Email должен быть в нижнем регистре'),

    password: yup
        .string()
        .required('Обязательное поле')
        .min(8, 'Пароль должен содержать минимум 8 символов')
        //.matches(regExpPassword, 'Пароль должен содержать минимум одну заглавную букву, одну строчную, одну цифру и один специальный символ')
        .notOneOf(commonPasswords, 'Этот пароль слишком простой. Пожалуйста, выберите другой пароль'),

    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
        .required('Обязательное поле'),
});

export const schemaLogin = yup.object().shape({
    email: yup
        .string()
        .trim()
        .required('Обязательное поле')
        .max(255, 'Email не должен превышать 255 символов')
        .matches(regExpEmail, 'Неверный формат почты')
        .lowercase('Email должен быть в нижнем регистре'),

    password: yup
        .string()
        .required('Обязательное поле')
        .min(8, 'Пароль должен содержать минимум 8 символов')
        //.matches(regExpPassword, 'Пароль должен содержать минимум одну заглавную букву, одну строчную, одну цифру и один специальный символ')
        .notOneOf(commonPasswords, 'Этот пароль слишком простой. Пожалуйста, выберите другой пароль'),
})