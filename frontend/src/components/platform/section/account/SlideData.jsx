import React from "react";
import CountrySelect from "../../components/CountrySelect.jsx";
import ReputationInput from "./ReputationInput.jsx";
import {
    firstSlideDataPlayer,
    secSlideDataPlayer,
    thirdSlideDataPlayer,
    fourthSlideDataPlayer,
    fifthSlideDataPlayer,
} from "../../../../utils/AccountData.js";
import SlideContentWrap from "./SlideContentWrap.jsx";
import CustomInput from "./CustomInput.jsx";
import MarkSelect from "./MarkSelect.jsx";

const SlideData = (slideType, fund_name, formData, setFormData, formBackerData, setFormBackerData) => {

    const handlePhoneNumberChange = React.useCallback((phoneNumber) => {
        setFormData((prevData) => ({...prevData, phonenumber: phoneNumber}));
    }, [setFormData]);

    const handleMarkChange = React.useCallback((backer_tag) => {
        setFormData((prevData) => ({...prevData, backer_tag: backer_tag}));
    }, [setFormData]);

    const handleChange = (key, value) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleBackerChange = (e) => {
        const { name, value, type } = e.target;
        let newValue = value;
        if (type === "radio" && name === "rollbackIncrease") {
            newValue = value === "true";
        }
        setFormBackerData((prev) => ({
            ...prev,
            [name]: newValue,
        }));
    };

    console.log(formData);

    console.log(formBackerData);

    switch (slideType) {
        case "addPlayer":
            return [
                {
                    id: 1,
                    content: (
                        <SlideContentWrap title="Личная информация">
                            <div className="slide__box">
                                <ReputationInput info={firstSlideDataPlayer} formData={formData}
                                                 setFormData={setFormData}/>
                                {/*<div className="slide__input-wrap">
                                        <div className="slide__label">
                                            Год рождения
                                        </div>
                                        <DateInput formData={formData} setFormData={setFormData}/>
                                    </div>*/}
                                <div className="slide__input-wrap">
                                    <div className="slide__label">
                                        Номер телефона
                                    </div>
                                    <CountrySelect onPhoneNumberChange={handlePhoneNumberChange}/>
                                </div>
                            </div>
                        </SlideContentWrap>
                    ),
                },
                {
                    id: 2,
                    content: (
                        <SlideContentWrap title="Ники в румах">
                            <div className="slide__box">
                                <ReputationInput info={secSlideDataPlayer} formData={formData}
                                                 setFormData={setFormData}/>
                            </div>
                            <div className="slide__input-wrap">
                                <label className="slide__label" htmlFor="Stretchpoker">
                                    Ник в сети Stretchpoker (vbet, grompoker, RPTbet)
                                </label>
                                <input
                                    className="slide__input"
                                    placeholder="Введите Имя"
                                    id="Stretchpoker"
                                    type="text"
                                    value={formData.Stretchpoker || ""}
                                    onChange={(e) => handleChange("Stretchpoker", e.target.value)}
                                />
                            </div>
                            <div className="slide__box">
                                <ReputationInput info={thirdSlideDataPlayer} formData={formData}
                                                 setFormData={setFormData}/>
                            </div>
                        </SlideContentWrap>
                    ),
                },
                {
                    id: 3,
                    content: (
                        <SlideContentWrap title="Контактная информация">
                            <div className="slide__box">
                                <ReputationInput info={fourthSlideDataPlayer} formData={formData}
                                                 setFormData={setFormData}/>
                            </div>
                        </SlideContentWrap>
                    ),
                },
                {
                    id: 4,
                    content: (
                        <SlideContentWrap title="Развернутый комментарий">
                            <div className="slide__box">
                                <CustomInput info={fifthSlideDataPlayer} formData={formData} setFormData={setFormData}/>
                            </div>
                            <div className="slide__input-wrap">
                                <div className="slide__label">
                                    Ваш развернутый комментарий по сложившейся ситуации
                                </div>
                                <textarea className="slide__textarea" value={formData.comment || ""}
                                          onChange={(e) => handleChange("comment", e.target.value)}>
                                </textarea>
                            </div>
                            <div className="slide__input-wrap">
                                <div className="slide__label">
                                    Маркер
                                </div>
                                <MarkSelect onMarkChange={handleMarkChange}/>
                            </div>
                        </SlideContentWrap>
                    ),
                },
            ];
        case "addBaker":
            return [
                {
                    id: 1,
                    content: (
                        <SlideContentWrap>
                            <div className="slide__box">
                                <div className="slide__input-wrap">
                                    <label className="slide__label" htmlFor="fund_name">
                                        Название Фонда
                                    </label>
                                    <input
                                        id="fund_name"
                                        type="text"
                                        name="fund_name"
                                        value={formBackerData.fund_name || ""}
                                        onChange={handleBackerChange}
                                        className="slide__input"
                                        placeholder="Введите название"
                                    />
                                </div>
                                <div className="slide__input-wrap">
                                    <label className="slide__label" htmlFor="siteLink">
                                        Ссылка на сайт
                                    </label>
                                    <input
                                        id="siteLink"
                                        type="text"
                                        name="siteLink"
                                        value={formBackerData.siteLink || ""}
                                        onChange={handleBackerChange}
                                        className="slide__input"
                                        placeholder="Введите ссылку на сайт"
                                    />
                                </div>
                                <div className="slide__input-wrap">
                                    <label className="slide__label" htmlFor="discordHouse">
                                        Ссылка на гостевой домик в Discord
                                    </label>
                                    <input
                                        id="discordHouse"
                                        type="text"
                                        name="discordHouse"
                                        value={formBackerData.discordHouse || ""}
                                        onChange={handleBackerChange}
                                        className="slide__input"
                                        placeholder="Введите ссылку на Discord"
                                    />
                                </div>
                                <div className="slide__input-wrap">
                                    <label className="slide__label" htmlFor="discordRepresentative">
                                        Контакт представителя в Discord
                                    </label>
                                    <input
                                        id="discordRepresentative"
                                        type="text"
                                        name="discordRepresentative"
                                        value={formBackerData.discordRepresentative || ""}
                                        onChange={handleBackerChange}
                                        className="slide__input"
                                        placeholder="Введите контакт"
                                    />
                                </div>
                            </div>
                        </SlideContentWrap>
                    ),
                },
                {
                    id: 2,
                    content: (
                        <SlideContentWrap>
                            <div className="slide__box">
                                {/*<div className="slide__input-wrap">
                                    <label className="slide__label">
                                        Базовый откат игроку
                                    </label>
                                    <div style={{display: "flex", flexWrap: "wrap", gap: "8px"}}>
                                        <div className="slide__input"
                                             style={{display: 'flex', gap: '8px', flexGrow: "1"}}>
                                            <div className="slide__custom-input slide__amount">
                                                от
                                                <input style={{width: '50px'}}
                                                />
                                            </div>
                                        </div>
                                        <div className="slide__input"
                                             style={{display: 'flex', gap: '8px', flexGrow: "1"}}>
                                            <div className="slide__custom-input slide__amount">
                                                до
                                                <input style={{width: '50px'}}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>*/}
                                <div className="slide__input-wrap" style={{height: "84px"}}>
                                    <label className="slide__label" htmlFor="">
                                        Дисциплина
                                    </label>
                                    <div className="slide__radio-wrap">
                                        <label className="slide__radio">
                                            <input
                                                type="radio"
                                                name="discipline"
                                                value="Кеш"
                                                checked={formBackerData.discipline === "Кеш"}
                                                onChange={handleBackerChange}
                                            />
                                            Кеш
                                        </label>
                                        <label className="slide__radio">
                                            <input
                                                type="radio"
                                                name="discipline"
                                                value="MTT"
                                                checked={formBackerData.discipline === "MTT"}
                                                onChange={handleBackerChange}
                                            />
                                            MTT
                                        </label>
                                    </div>
                                </div>
                                <div className="slide__input-wrap" style={{height: "84px"}}>
                                    <label className="slide__label" htmlFor="">
                                        Возможность увеличить свой откат
                                    </label>
                                    <div className="slide__radio-wrap">
                                        <label className="slide__radio">
                                            <input
                                                type="radio"
                                                name="rollbackIncrease"
                                                value="true"
                                                checked={formBackerData.rollbackIncrease === true}
                                                onChange={handleBackerChange}
                                            />
                                            Да
                                        </label>
                                        <label className="slide__radio">
                                            <input
                                                type="radio"
                                                name="rollbackIncrease"
                                                value="false"
                                                checked={formBackerData.rollbackIncrease === false}
                                                onChange={handleBackerChange}
                                            />
                                            Нет
                                        </label>
                                    </div>
                                </div>
                                <div className="slide__input-wrap" style={{gridColumn: "span 2", height: "84px"}}>
                                    <label className="slide__label" htmlFor="">
                                        Рейкбек
                                    </label>
                                    <div className="slide__radio-wrap">
                                        <label className="slide__radio">
                                            <input
                                                type="radio"
                                                name="rakeback"
                                                value="В пакет"
                                                checked={formBackerData.rakeback === "В пакет"}
                                                onChange={handleBackerChange}
                                            />
                                            В пакет
                                        </label>
                                        <label className="slide__radio">
                                            <input
                                                type="radio"
                                                name="rakeback"
                                                value="Игроку"
                                                checked={formBackerData.rakeback === "Игроку"}
                                                onChange={handleBackerChange}
                                            />
                                            Игроку
                                        </label>
                                        <label className="slide__radio">
                                            <input
                                                type="radio"
                                                name="rakeback"
                                                value="Игроку при условиях"
                                                checked={formBackerData.rakeback === "Игроку при условиях"}
                                                onChange={handleBackerChange}
                                            />
                                            Игроку при условиях
                                        </label>
                                    </div>
                                </div>
                                <div className="slide__input-wrap">
                                    <label className="slide__label" htmlFor="numberCoach">
                                        Сколько у вас тренеров
                                    </label>
                                    <input
                                        id="numberCoach"
                                        type="text"
                                        name="numberCoach"
                                        value={formBackerData.numberCoach || ""}
                                        onChange={handleBackerChange}
                                        className="slide__input"
                                        placeholder="Введите количество"
                                    />
                                </div>
                                <div className="slide__input-wrap">
                                    <label className="slide__label" htmlFor="numberPlayer">
                                        Количество игроков в команде
                                    </label>
                                    <input
                                        id="numberPlayer"
                                        type="text"
                                        name="numberPlayer"
                                        value={formBackerData.numberPlayer || ""}
                                        onChange={handleBackerChange}
                                        className="slide__input"
                                        placeholder="Введите количество"
                                    />
                                </div>
                            </div>
                        </SlideContentWrap>
                    ),
                },
                {
                    id: 3,
                    content: (
                        <SlideContentWrap>
                            <div className="slide__input-wrap">
                                <div className="slide__label">
                                    Информация о фонде
                                </div>
                                <textarea
                                    placeholder="Информация будет использоваться на сайте PR в раздела о вашем фонде. В будущем вы сможете скорректировать инфорацию в личном кабинете"
                                    name="fundDescr"
                                    className="slide__textarea"
                                    value={formBackerData.fundDescr || ""}
                                    onChange={handleBackerChange}>
                                </textarea>
                            </div>
                        </SlideContentWrap>
                    ),
                },
            ]
    }
}

export default SlideData;