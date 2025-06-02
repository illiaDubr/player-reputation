import React from "react";
import styles from "../Navigation.module.scss"
import {Link} from "react-router-dom";
import IconSvg from "@shared/ui/IconSvg/index.js";
import {ROUTES} from "@shared/config/routes.js";
import {animated, useSpring} from '@react-spring/web'
import LogoutBtn from "@shared/ui/LogoutBtn";
import {NAV_DATA} from "@widgets/BaseHeader/ui/Navigation/config/navData.js";

const AdminNavigation = ({isOpen}) => {

    const iconAnimation = useSpring({
        left: isOpen ? '15px' : '35px',
        from: {left: '35px'},
    });

    const textAnimation = useSpring({
        opacity: isOpen ? 1 : 0,
        left: isOpen ? '45px' : '200px',
        display: isOpen ? 'block' : 'none',
        from: {opacity: 0, left: '200px', display: 'none'},
    })

    return (
        <>
            <li className={`${styles[`navigation__item`]}`}>
                <Link to={ROUTES.ADMIN.HOME} className={`${styles[`navigation__logo-link`]}`}>
                    <IconSvg width={70} height={44} id="logo"/>
                </Link>
            </li>
            <ul className={styles[`navigation__list-box`]}>
                {NAV_DATA.ADMIN.map((item, index) => (
                    <li className={styles[`navigation__item`]} key={index}>
                        <Link to={item.link} className={styles[`navigation__list-item__link`]}>
                            <animated.span className={styles[`svg-box`]} style={iconAnimation}>
                                <IconSvg width={20} height={20} id={item.icon}/>
                            </animated.span>
                            <animated.span className={styles[`navigation__text`]} style={textAnimation}>
                                {item.header_text}
                            </animated.span>
                        </Link>
                    </li>
                ))}
            </ul>
            <li className={`${styles[`navigation__item`]}`}>
                <LogoutBtn className={styles[`navigation__list-item__link`]} iconAnimation={iconAnimation} textAnimation={textAnimation}/>
            </li>
        </>
    )
}

export default AdminNavigation;