import React from "react";
import {Link} from "react-router-dom";
import IconSvg from "@shared/ui/IconSvg/index.js";
import Resize from "@shared/ui/Resize";
import {clsx} from 'clsx';
import styles from './PortalHeader.module.scss';
import AuthTrigger from "@shared/ui/AuthTrigger/index.jsx";
import {ROUTES} from "@shared/config/routes.js";

const PortalHeader = () => {
    return (
        <header className={styles['portal-header']}>
            <nav className={styles['portal-header__nav-wrap']} aria-label="Главная навигация">
                <ul className={styles['portal-header__nav']}>
                    <li className={styles['portal-header__nav-item']}>
                        <Link to="#" className={clsx(styles['portal-header__nav-link'], styles['svg-logo'])}>
                            <Resize width={670} fallback={
                                <IconSvg width={61} height={36} id="logo"/>
                            }>
                                <IconSvg width={110} height={48} id="logo"/>
                            </Resize>
                        </Link>
                    </li>
                    <li className={styles['portal-header__nav-item']}>
                        <AuthTrigger text="Войти"/>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default PortalHeader;