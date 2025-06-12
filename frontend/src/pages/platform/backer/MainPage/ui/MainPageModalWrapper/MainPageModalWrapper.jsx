import React from "react";
import UnifiedBackerData from "@features/UnifiedBackerData/ui";
import styles from "./MainPageModalWrapper.module.scss";
import Button from "@shared/ui/SubmitButton";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {
    createSchema,
    setupSchema
} from "@pages/platform/backer/MainPage/ui/MainPageModalWrapper/model/mainPageSchema.js";
import {useModal, useStore} from "@app/providers/index.jsx";
import SlideWarning from "@pages/platform/backer/MainPage/ui/MainPageModalWrapper/ui";

const MainPageModalWrapper = ({origin, fund_name, backerId}) => {
    const {store} = useStore();
    const methods = useForm({
        mode: 'onChange',
        resolver: origin === "create" ? yupResolver(createSchema) : yupResolver(setupSchema),
    });
    const slides = UnifiedBackerData(origin, methods);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(false);
    const {closeModal} = useModal();

    const handlePaginationClick = (index) => {
        setActiveIndex(index);
    };

    const handlePrevClick = () => {
        if (activeIndex > 0) {
            setActiveIndex((prevIndex) => prevIndex - 1);
        }
    };

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            if (origin === "create") {
                const createData = {
                    ...data,
                    fund_name: fund_name,
                }

                await store.createPlayer(createData);
            } else if (origin === "setup") {
                const setupData = {
                    ...data,
                    id: backerId,
                    approved: "under_review",
                }

                await store.backerApproval(setupData);
            }
            closeModal();
        } catch (e) {
            methods.setError('root', {message: e?.message || "Ошибка запроса"});
        } finally {
            setIsLoading(false);
        }
    };

    const isLastSlide = activeIndex === slides.length - 1;

    const handleButtonAction = (e) => {
        e.preventDefault();
        if (!isLastSlide) {
            setActiveIndex((prevIndex) => prevIndex + 1);
        }
    };

    const getErrorMessage = () => {
        const errors = methods.formState.errors;

        if (errors.root?.message) return errors.root.message;

        const hasFieldErrors = Object.keys(errors).some(key => key !== 'root');
        if (hasFieldErrors) return 'Заполните все поля';

        return null;
    };

    return (
        <FormProvider {...methods}>
            <form className={`${styles[`form__wrap`]}`} onSubmit={methods.handleSubmit(onSubmit)}>
                {slides.map((item, index) => (
                    <div
                        className={`${styles[`slides__wrap`]}  ${activeIndex === index ? `${styles[`slides__wrap-active`]}` : ``}`}
                        key={item.id}>
                        {item.content}
                    </div>
                ))}

                {activeIndex === 3 && (
                    <SlideWarning>
                        Перед отправкой информации об игроке обязательно перепроверьте все данные и сумму ущерба —
                        это может повлиять на его дальнейшую карьеру.
                    </SlideWarning>
                )}

                {getErrorMessage() && (
                    <SlideWarning>
                        {getErrorMessage()}
                    </SlideWarning>
                )}

                {activeIndex > 0 && (
                    <div className={`${styles[`slide__btn-prev`]}`} onClick={handlePrevClick}>
                        Вернуться назад
                    </div>
                )}

                <div className={`${styles[`slide__pag`]}`}>
                    {slides.map((_, index) => (
                        <span
                            key={index}
                            className={`${styles.pag} ${activeIndex === index ? `${styles[`pag--active`]}` : ''}`}
                            onClick={() => handlePaginationClick(index)}
                        >
                       </span>
                    ))}
                </div>
                <Button
                    type={isLastSlide ? "submit" : "button"}
                    onClick={!isLastSlide ? handleButtonAction : undefined}
                >
                    {isLastSlide ? "Отправить" : "Далее"}
                </Button>
            </form>
        </FormProvider>
    )
}

export default MainPageModalWrapper;