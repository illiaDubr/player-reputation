import * as yup from 'yup';

export const ProfileSchema = yup.object().shape({
    description: yup
        .string()
        .trim()
        .max(250, 'Описание не должно превышать 255 символов')
        .matches(/^[^0-9]*$/, 'Описание не должно содержать цифры'),

    contact_name: yup
        .string()
        .trim()
        .max(250, 'ФИО не должно превышать 255 символов'),

    discord: yup
        .string()
        .trim()
        .max(100, 'Discord не должен превышать 100 символов'),
});