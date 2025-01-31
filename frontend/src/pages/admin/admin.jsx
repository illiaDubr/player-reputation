import React from 'react';
import Main from "../../components/main/Main.jsx";

const Admin = () => {
    return (
        <Main>
            <div className="row-wrap">
                <div className="row">
                    Название фонда: test
                </div>
                <div className="row">
                    Ссылка на сайт: test.com
                </div>
                <div className="row">
                    Ссылка на discord: test.com
                </div>
                <div className="row">
                    Контакт в discord: @test
                </div>
                <div className="row">
                    Базовый откат игроку: от 10 до 100
                </div>
                <div className="row">
                    Возможность увеличить свой откат: Да
                </div>
                <div className="row">
                    Дистанция первого контракта: от 01.01.2025 31.01.2025
                </div>
                <div className="row">
                    Возможность увеличить свой откат: Игроку
                </div>
                <div className="row">
                    Сколько у вас тренеров: 2
                </div>
                <div className="row">
                    Количество игроков в команде: 5
                </div>
                <div className="row">
                    Информация о фонде: test
                </div>
            </div>
            <button type="button" className="temporary">
                Верефицировать
            </button>
        </Main>
    );
};

export default Admin;