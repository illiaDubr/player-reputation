import React from "react";

const ContactForm = () => {
    return (
        <div className="contact__form-wrap">
            <h3 className="">
                Есть вопросы?<br/>
                Свяжитесь с нами
            </h3>
            <form className="contact__form">
                <div className="contact__form-field">
                    <label htmlFor="contact-discord">
                        Дискорд
                    </label>
                    <input id="contact-discord" type="text" placeholder="Введите дискорд"/>
                </div>
                <div className="contact__form-field">
                    <label htmlFor="contact-email">
                        Почта
                    </label>
                    <input id="contact-email" type="text" placeholder="Введите почту"/>
                </div>
                <button className="contact__btn" type="submit">
                    Отправить
                </button>
            </form>
            <span className="filter">
            </span>
        </div>
    )
}

export default ContactForm