import React from "react";
//import DateInput from "./DateInput.jsx";
import CountrySelect from "../../components/CountrySelect.jsx";
import ReputationInput from "./ReputationInput.jsx";
import {
    firstSlideDataPlayer,
    secSlideDataPlayer,
    thirdSlideDataPlayer,
    fourthSlideDataPlayer,
    fifthSlideDataPlayer,
    test1, test2
} from "../../../../utils/AccountData.js";
import SlideContentWrap from "./SlideContentWrap.jsx";
import CustomInput from "./CustomInput.jsx";
import MarkSelect from "./MarkSelect.jsx";
import DateInput from "./DateInput.jsx";

const SlideData = (slideType, formData, setFormData) => {

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

    console.log(formData);

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
                                <textarea className="slide__textarea" value={formData.comment || ""}   onChange={(e) => handleChange("comment", e.target.value)}>
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
                                <ReputationInput info={test1} formData={formData}
                                                 setFormData={setFormData}/>
                            </div>
                        </SlideContentWrap>
                    ),
                },
                {
                    id: 2,
                    content: (
                        <SlideContentWrap>
                            <div className="slide__box">
                                <div className="slide__input-wrap">
                                    <label className="slide__label">
                                        Базовый откат игроку
                                    </label>
                                    <div style={{display: "flex", flexWrap: "wrap", gap: "8px"}}>
                                        <div className="slide__input" style={{display: 'flex', gap: '8px', flexGrow: "1"}}>
                                            <div className="slide__custom-input slide__amount">
                                                от
                                                <input style={{width:'50px'}}
                                                />
                                            </div>
                                        </div>
                                        <div className="slide__input" style={{display: 'flex', gap: '8px', flexGrow: "1"}}>
                                            <div className="slide__custom-input slide__amount">
                                                до
                                                <input style={{width:'50px'}}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="slide__input-wrap">
                                    <div className="slide__label">
                                        Возможность увеличить свой откат
                                    </div>
                                    <div style={{display: "flex", flexWrap: "wrap", gap: "8px"}}>
                                        <label className="qq" htmlFor="lol">
                                            Да
                                            <input id="lol" name="drone" className="hidden" type="radio" checked={true}/>
                                        </label>
                                        <label className="qq" htmlFor="bruh">
                                            Нет
                                            <input id="bruh" name="drone" className="hidden" type="radio" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="slide__box">
                                <div className="slide__input-wrap">
                                    <div className="slide__label">
                                        Дистанция первого контракта
                                    </div>
                                    <span className="ll">
                                        от
                                    </span>
                                    <DateInput />
                                </div>
                                <div className="slide__input-wrap">
                                    <div className="slide__label">

                                    </div>
                                    <span className="ll">
                                        до
                                    </span>
                                    <DateInput />
                                </div>
                            </div>
                            <div className="slide__input-wrap">
                                <div className="slide__label">
                                    Рейкбек
                                </div>
                                <div style={{display: "flex", flexWrap: "wrap", gap: "8px"}}>
                                    <label className="qq" htmlFor="lol1">
                                        В пакет
                                        <input id="lol1" name="drone1" className="hidden" type="radio" checked={true}/>
                                    </label>
                                    <label className="qq" htmlFor="bruh1">
                                        Игроку
                                        <input id="bruh1" name="drone1" className="hidden" type="radio" />
                                    </label>
                                    <label className="qq" htmlFor="bruh2">
                                        Игроку при условиях
                                        <input id="bruh2" name="drone1" className="hidden" type="radio" />
                                    </label>
                                </div>
                            </div>
                            <div className="slide__box">
                                <ReputationInput info={test2} formData={formData}
                                                 setFormData={setFormData}/>
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
                                <textarea className="slide__textarea" value={formData.comment || ""}   onChange={(e) => handleChange("comment", e.target.value)}>
                                </textarea>
                            </div>
                        </SlideContentWrap>
                    ),
                },
            ]
    }
}

export default SlideData;