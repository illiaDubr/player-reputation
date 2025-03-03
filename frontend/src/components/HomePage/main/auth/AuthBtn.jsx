import React from "react";
import { useModal } from "../../../platform/components/Modal.jsx";

const AuthBtn = () => {
    const {openModal} = useModal();

    const openAuthModal = () => {
        openModal("Auth");
    };

    return (
        <button type="button" onClick={openAuthModal} className="auth__button">
            Зарегистрироваться
        </button>
    )
}

export default AuthBtn;