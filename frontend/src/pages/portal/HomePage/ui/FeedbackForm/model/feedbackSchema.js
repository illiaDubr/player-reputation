import * as yup from 'yup';

export const feedbackSchema = yup.object().shape({
    discord: yup
        .string()
        .required('Обязательное поле'),
    question: yup
        .string()
        .required('Обязательное поле')
        .min(10, "Минимум 10 символов"),
});