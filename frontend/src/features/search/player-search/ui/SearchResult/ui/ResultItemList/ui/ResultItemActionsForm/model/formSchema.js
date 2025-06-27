import * as yup from 'yup';

export const reportSchema = yup.object().shape({
    comment: yup
        .string()
        .required("Это поле обязательно"),
});