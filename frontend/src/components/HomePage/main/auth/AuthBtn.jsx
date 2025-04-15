import React from "react";
import { useModal } from "../../../platform/components/Modal.jsx";

const AuthBtn = ({text, isActive}) => {
    const {openModal} = useModal();

    const openAuthModal = () => {
        openModal("Auth", { isActive: isActive});
    };

    return (
        <button type="button" onClick={openAuthModal} className="auth__button">
            {text}
        </button>
    )
}

export default AuthBtn;