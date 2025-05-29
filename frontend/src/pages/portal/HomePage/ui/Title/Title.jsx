import React from 'react';
//import Switcher from "@features/role-switcher/ui/Switcher";
import styles from './Title.module.scss';
import AuthTrigger from "@shared/ui/AuthTrigger";

const Title = () => {
    return (
        <div className={`${styles.title}`}>
            <div className={`${styles['title__box']}`}>
                {/*<Switcher variant="title" text={false} />*/}
                <span className="title__gradient">
                    Players Reputation
                </span>
                <h1>
                    Хаб прозрачного бэкинга для бэкеров
                </h1>
                <div className={`${styles['title__subtitle']}`}>
                    Создайте свой личный кабинет, чтобы получить доступ к возможностям сервиса
                </div>
            </div>
            <AuthTrigger text="Зарегистрироваться"/>
        </div>
    )
}

export default Title;