import React from 'react';
import Switcher from "../components/Switcher.jsx";
import AuthBtn from "../auth/AuthBtn.jsx";

const Title = () => {
    return (
        <div className="title__wrap">
            <div className="title__box">
                <Switcher text={false}/>
                <span className="gradient-text">
                    Players Reputation
                </span>
                <h1>
                    Хаб прозрачного бэкинга для игроков
                    <br/>
                    и бэкеров
                </h1>
                <div className="title__subtitle">
                    Создайте свой личный кабинет, чтобы получить доступ к возможностям сервиса
                </div>
            </div>
            <AuthBtn/>
        </div>
    )
}

export default Title;