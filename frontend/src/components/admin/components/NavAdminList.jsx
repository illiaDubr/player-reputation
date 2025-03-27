import React from "react";
import {NavListData} from "../../../utils/AdminData.js";
import {Link} from "react-router-dom";
import IconSvg from "../../platform/components/IconSvg.jsx";
import {animated, useSpring} from '@react-spring/web'
import LogoutBtn from "../../platform/components/LogoutBtn.jsx";
import {ADMIN_ROUTE} from "../../../utils/const.js";
import {useNotifications} from "./useNotifications.jsx";
import Notification from "./Notification.jsx";

const NavAdminList = ({isOpen}) => {
    const notifications = useNotifications();

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

    const notificationAnimation = useSpring({
        left: isOpen ? "173px" : "61px",
        from: {left: '173px'},
    })

    return (
        <>
            <li className="navigation__list-item">
                <Link to={ADMIN_ROUTE} className="navigation__list-item__link-logo">
                    <IconSvg width={70} height={44} id="logo"/>
                </Link>
            </li>
            <ul className="navigation__list-box">
                {NavListData.map((item) => {
                    const notification = notifications[item.id]
                        ? notifications[item.id]
                        : "";
                    return (
                        <li className="navigation__list-item" key={item.icon}>
                            <Link to={item.link} className="navigation__list-item__link">
                                <animated.span className="svg-box" style={iconAnimation}>
                                    <IconSvg width={20} height={20} id={item.icon}/>
                                </animated.span>
                                <animated.span className="navigation__text" style={textAnimation}>
                                    {item.header_text}
                                </animated.span>
                                {notification && (
                                    <animated.div className="notification__wrap" style={notificationAnimation}>
                                        <Notification value={notification} fontSize={9}/>
                                    </animated.div>
                                )}
                            </Link>
                        </li>
                    )
                })}
                <li className="navigation__list-item">
                    <LogoutBtn className="navigation__list-item__link" iconAnimation={iconAnimation}
                               textAnimation={textAnimation}/>
                </li>
            </ul>
        </>
    )
}

export default React.memo(NavAdminList);