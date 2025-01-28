import React from "react";
import IconSvg from "../../components/IconSvg.jsx";
import SlideData from "./SlideData.jsx";
import {useAddPlayerData} from "../../../../utils/AccountData.js";

import {Context} from "../../../../api/store/storeContext.js";

const AccountForm = ({slideType}) => {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [formData, setFormData] = useAddPlayerData();
    const slides = SlideData(slideType, formData, setFormData);
    const {store} = React.useContext(Context);

    const handlePaginationClick = (index) => {
        setActiveIndex(index);
    };

    const handlePrevClick = () => {
        if (activeIndex > 0) {
            setActiveIndex((prevIndex) => prevIndex - 1);
        }
    };

    const submitForm = async (formData) => {
        await store.addPlayer(formData);
    }

    return (
        <form className="modal__body" method="POST" onSubmit={submitForm}>
            <div className="slide__wrap">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`slide ${activeIndex === index ? 'slide-active' : ''}`}
                    >
                        {slide.content}
                    </div>
                ))}
            </div>
            {activeIndex === 3 && (
                <div className="slide__warning">
                    <IconSvg width={24} height={24} id="red_notification" />
                    <p>
                        Перед отправкой информации о игровку обязательно перепроверьте
                        всю информацию и сумму ущерба. Это повлияет на дальнейшую жизнь
                        человека
                    </p>
                </div>
            )}
            {activeIndex > 0 && (
                <div className="slide__btn-prev" onClick={handlePrevClick}>
                    Вернуться назад
                </div>
            )}
            <div className="slide__pag">
                {slides.map((_, index) => (
                    <span
                        key={index}
                        className={`pag ${activeIndex === index ? 'pag-active' : ''}`}
                        onClick={() => handlePaginationClick(index)}
                    ></span>
                ))}
            </div>
            {/*<div className="slide__btn-next">
                Next
            </div>*/}

            <button type="submit" className="slide__btn-next">
                Отправить
            </button>
        </form>
    )
}

export default AccountForm