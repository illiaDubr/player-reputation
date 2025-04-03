import React from 'react';
import IconSvg from "../../platform/components/IconSvg.jsx";
import {Link} from "react-router-dom";

const Footer = ({selectedRole}) => {
    return (
        <footer className={`footer ${selectedRole}`}>
            <IconSvg width={110} height={48} id="logo" />
            <div className="footer__gap">
                <Link to="#">
                    Политика конфиденциальности
                </Link>
                <Link to="#">
                    Файлы куки
                </Link>
            </div>
            <div className="footer__copyright">
                2025 Copyright © Player Reputation
            </div>
        </footer>
    )
}

export default Footer;