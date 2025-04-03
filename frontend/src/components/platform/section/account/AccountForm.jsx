import React from "react";
import IconSvg from "../../components/IconSvg.jsx";
import SlideData from "./SlideData.jsx";
import {useAddPlayerData, useBackerApprovalData} from "../../../../utils/AccountData.js";
import {Context} from "../../../../api/store/storeContext.js";

const AccountForm = ({slideType, modalOpen}) => {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [formData, setFormData] = useAddPlayerData();
    const [formBackerData, setFormBackerData] = useBackerApprovalData();
    const slides = SlideData(slideType, formData, setFormData, formBackerData, setFormBackerData);
    const {store} = React.useContext(Context);
    const userId = store.user?.backer?.backer_id;

    const formMethod = slideType === "addPlayer" ? "POST" : slideType === "addBaker" ? "PUT" : "POST";

    const handlePaginationClick = (index) => {
        setActiveIndex(index);
    };

    const handlePrevClick = () => {
        if (activeIndex > 0) {
            setActiveIndex((prevIndex) => prevIndex - 1);
        }
    };

    const submitForm = async (e) => {
        e.preventDefault();
        if (activeIndex < slides.length - 1) {
            setActiveIndex((prevIndex) => prevIndex + 1);
        } else {
            try {
                if (slideType === "addPlayer") {
                    await store.addPlayer(formData);
                    console.log("Данные успешно отправлены (addPlayer):", formData);
                } else if (slideType === "addBaker") {
                    const backerData = {
                        ...formBackerData,
                        id: userId,
                        approved: "under_review",
                    }
                    console.log("data backer", backerData);
                    await store.backerApproval(backerData);
                }
            } catch (error) {
                console.error("Ошибка при отправке данных:", error);
            } finally {
                modalOpen();
            }
        }
    }

    return (
        <form className="modal__body" method={formMethod} onSubmit={submitForm}>
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
                        всю информацию и сумму ущерба. Это повлияет на дальнейшую карьеру игрока
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

            <button type="submit" className="slide__btn-next" onClick={submitForm}>
                {activeIndex < slides.length - 1 ? "Далее" : "Отправить"}
            </button>
        </form>
    )
}

export default AccountForm