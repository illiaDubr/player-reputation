import React from "react";
import IconSvg from "../../../components/IconSvg.jsx";

const ProfileItem = ({title, value, placeholder, isActive, onToggle, inputClass, textClass }) => {
    return (
        <div className="profile__field">
            <div className="profile__title">{title}</div>
            <div className="profile__content">
                <div className={`profile__text ${textClass}`}>{value}</div>
                <input
                    className={`profile__input ${inputClass}`}
                    type="text"
                    placeholder={placeholder}
                />
            </div>
            <button type="button" onClick={onToggle} className={`profile__edit-btn ${isActive ? "profile__edit-btn--active" : ""}`}>
                <IconSvg width={16} height={16} id="pen" />
            </button>
        </div>
    )
}

export default ProfileItem;