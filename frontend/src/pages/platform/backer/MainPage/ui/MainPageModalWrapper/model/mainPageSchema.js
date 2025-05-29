import * as yup from 'yup';

export const createSchema = yup.object().shape({
    last_name: yup.string().required("Это поле обязательно"),
    first_name: yup.string().required("Это поле обязательно"),
    backer_tag: yup.string().required("Это поле обязательно"),
    comment: yup.string().required("Это поле обязательно"),
});

export const setupSchema = yup.object().shape({
    fund_name: yup.string().required("Это поле обязательно"),
    siteLink: yup.string().required("Это поле обязательно"),
    discordRepresentative: yup.string().required("Это поле обязательно"),
    discipline: yup.string().required("Это поле обязательно"),
});