import React from "react";
import {NavListData} from "../../../utils/AdminData.js";
import {Link} from "react-router-dom";
import IconSvg from "../../platform/components/IconSvg.jsx";
import { animated, useSpring } from '@react-spring/web'
import LogoutBtn from "../../platform/components/LogoutBtn.jsx";
import {HOMEPAGE_ROUTE} from "../../../utils/const.js";

const NavAdminList = ({isOpen}) => {
    const iconAnimation = useSpring({
        left: isOpen ? '15px' : '35px',
        from: { left: '35px' },
    });

    const textAnimation = useSpring({
        opacity: isOpen ? 1 : 0,
        left: isOpen ? '45px' : '200px',
        display: isOpen ? 'block' : 'none',
        from: { opacity: 0, left: '200px', display: 'none' },
    })

    return (
        <>
            <li className="navigation__list-item">
                <Link to={HOMEPAGE_ROUTE} className="navigation__list-item__link-logo">
                    <IconSvg width={70} height={44} id="logo"/>
                </Link>
            </li>
            <ul className="navigation__list-box">
                {NavListData.map((item, index) => (
                    <li className="navigation__list-item" key={index}>
                        <Link to={item.link} className="navigation__list-item__link">
                            <animated.span className="svg-box" style={iconAnimation}>
                                <IconSvg width={20} height={20} id={item.icon}/>
                            </animated.span>
                            <animated.span className="navigation__text" style={textAnimation}>
                                {item.text}
                            </animated.span>
                        </Link>
                    </li>
                ))}
                <li className="navigation__list-item">
                    <LogoutBtn className="navigation__list-item__link" iconAnimation={iconAnimation} textAnimation={textAnimation}/>
                </li>
            </ul>
        </>
    )
}

export default NavAdminList;