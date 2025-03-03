import React from 'react';
import Auth from "../auth/Auth.jsx";

const Title = () => {
    return (
        <div className="title__wrap">
            <div className="title__box">
                <span className="gradient-text">
                    Players Reputation
                </span>
                <h1>
                    Хаб прозрачного бэкинга для игроков
                    и бэкеров
                </h1>
                <div className="">
                    Создайте свой личный кабинет, чтобы получить доступ к возможностям сервиса
                </div>
            </div>
            <Auth />
        </div>
    )
}

export default Title;