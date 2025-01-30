import React from "react";
//import DateInput from "./DateInput.jsx";
import CountrySelect from "../../components/CountrySelect.jsx";
import ReputationInput from "./ReputationInput.jsx";
import {
    firstSlideDataPlayer,
    secSlideDataPlayer,
    thirdSlideDataPlayer,
    fourthSlideDataPlayer,
    fifthSlideDataPlayer
} from "../../../../utils/AccountData.js";
import SlideContentWrap from "./SlideContentWrap.jsx";
import CustomInput from "./CustomInput.jsx";
import MarkSelect from "./MarkSelect.jsx";

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
                        <>
                            <div className='slide__title'>
                                бэкер
                            </div>
                        </>
                    ),
                },
            ]
    }
}

export default SlideData;