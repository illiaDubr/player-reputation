import React from 'react';
import styles from "./FeedbackForm.module.scss"
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Input from "@shared/ui/Input/index.js";
import {feedbackSchema} from "./model/feedbackSchema.js";
import Button from "@shared/ui/SubmitButton/index.js";

const FeedbackForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(feedbackSchema),
        mode: 'onChange',
    });

    const onSubmit = data => console.log(data);

    return (
        <div className={`${styles[`feedback`]}`}>
            <h3 className={`${styles[`feedback__title`]}`}>
                Есть вопросы?<br/>
                Свяжитесь с нами
            </h3>
            <form className={`${styles['feedback__form']}`} onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <Input
                    label="Дискорд"
                    type="text"
                    placeholder="Введите Discord"
                    {...register("discord")}
                    error={errors.discord}
                />
                <Input
                    label="Задать вопрос"
                    type="text"
                    placeholder="Введите вопрос"
                    {...register("question")}
                    error={errors.question}
                />
                <Button maxWidth={371}>
                    Отправить
                </Button>
            </form>

            <span className="feedback__filter"></span>
        </div>
    )
}

export default FeedbackForm;