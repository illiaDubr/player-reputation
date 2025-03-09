import React from "react";
import {PLANS__DATA} from "../../../../../utils/SubscriptionData.js";
import {Link} from "react-router-dom";

const Subscribe = () => {
    return (
        <div className="subscription__box">
            {PLANS__DATA.map((item, index) => (
                <div className="subscription" key={index}>
                    <div className="subscription__title">
                        {item.title}
                    </div>
                    <div className="subscription__description">
                        {item.description}
                    </div>
                    <ul className="subscription__list">
                        {item.features.map((feature, index) => (
                            <li key={index} className="subscription__feature">
                                {feature}
                            </li>
                        ))}
                    </ul>
                    <div className="subscription__price">
                        ${item.price} <span>/ месяц</span>
                    </div>
                    <Link className="subscription__link" to={item.link}>
                        Обновится сейчас
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default Subscribe;