import React from "react";
import DateInput from "./DateInput.jsx";
import CountrySelect from "../../components/CountrySelect.jsx";
import ReputationInput from "./ReputationInput.jsx";
import {firstSlideData, secSlideData} from "../../../../utils/AccountData.js";

const SlideData = (slideType, formData, setFormData) => {
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
                                    <ReputationInput info={firstSlideData} formData={formData} setFormData={setFormData} />
                                    {/*<div className="slide__input-wrap">
                                <div className="slide__label">
                                    Год рождения
                                </div>
                                <DateInput />
                            </div>
                            <div className="slide__input-wrap">
                                <div className="slide__label">
                                    Номер телефона
                                </div>
                                <CountrySelect />
                            </div>*/}
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
                            {/*<div className="slide__content">
                        <div className="slide__box">
                            <ReputationInput info={secSlideData} />
                        </div>
                        <div className="slide__input-wrap">
                            <label className="slide__label">
                                Ник в сети Stretchpoker (vbet, grompoker, RPTbet)
                            </label>
                            <input className="slide__input" placeholder="Введите Имя" type="text"/>
                        </div>
                    </div>*/}
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