import React from 'react';
import {useModal} from "@app/providers";
import styles from "./AuthTrigger.module.scss";

const AuthTrigger = ({text}) => {
    const {openModal} = useModal();

    return (
        <button className={`${styles[`auth__btn`]}`} type="button" onClick={() => openModal('Auth')}>
            {text}
        </button>
    )
}

export default AuthTrigger;