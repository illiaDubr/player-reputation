import React from "react";
//import DateInput from "./DateInput.jsx";
import CountrySelect from "../../components/CountrySelect.jsx";
import ReputationInput from "./ReputationInput.jsx";
import {firstSlideDataPlayer, secSlideDataPlayer, thirdSlideDataPlayer, fourthSlideDataPlayer} from "../../../../utils/AccountData.js";

const SlideData = (slideType, formData, setFormData) => {

    const handlePhoneNumberChange = React.useCallback((phoneNumber) => {
        setFormData((prevData) => ({...prevData, phonenumber: phoneNumber}));
    }, [setFormData]);

    const handleChange = (key, value) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value, // Обновляем значение по ключу
        }));
    };

    console.log(formData);

    switch (slideType) {
        case "addPlayer":
            return [
                {
                    id: 1,
                    content: (
                        <>
                            <div className='slide__title'>
                                Личная информация
                            </div>
                            <div className="slide__content">
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
                            </div>

                        </>
                    ),
                },
                {
                    id: 2,
                    content: (
                        <>
                            <div className='slide__title'>
                                Ники в румах
                            </div>
                            <div className="slide__content">
                                <div className="slide__box">
                                    <ReputationInput info={secSlideDataPlayer} formData={formData}
                                                     setFormData={setFormData}/>
                                </div>
                                <div className="slide__input-wrap">
                                    <label className="slide__label">
                                        Ник в сети Stretchpoker (vbet, grompoker, RPTbet)
                                    </label>
                                    <input
                                        className="slide__input"
                                        placeholder="Введите Имя"
                                        type="text"
                                        value={formData.Stretchpoker || ""}
                                        onChange={(e) => handleChange("Stretchpoker", e.target.value)}
                                    />
                                </div>
                                <div className="slide__box">
                                    <ReputationInput info={thirdSlideDataPlayer} formData={formData}
                                                     setFormData={setFormData}/>
                                </div>
                            </div>
                        </>
                    ),
                },
                {
                    id: 3,
                    content: (
                        <>
                            <div className='slide__title'>
                                Контактная информация
                            </div>
                            <div className="slide__content">
                                <div className="slide__box">
                                    <ReputationInput info={fourthSlideDataPlayer} formData={formData}
                                                     setFormData={setFormData}/>
                                </div>
                            </div>
                        </>
                    ),
                },
                {
                    id: 4,
                    content: (
                        <>
                            <div className='slide__title'>
                                Развернутый комментарий
                            </div>
                        </>
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