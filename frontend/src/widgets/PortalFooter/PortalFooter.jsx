import React from 'react';
import IconSvg from "@shared/ui/IconSvg/index.js";
import {Link} from "react-router-dom";
import styles from "./PortalFooter.module.scss"

const Footer = () => {
    return (
        <footer className={`${styles.footer}`}>
            <IconSvg width={110} height={48} id="logo" />
            <div className={`${styles[`footer__gap`]}`}>
                <Link to="#">
                    Политика конфиденциальности
                </Link>
                <Link to="#">
                    Файлы куки
                </Link>
            </div>
            <div className={`${styles[`footer__copyright`]}`}>
                2025 Copyright © Player Reputation
            </div>
        </footer>
    )
}

export default Footer;