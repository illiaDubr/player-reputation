import React from "react";
import {NavListData} from "../../../utils/AdminData.js";
import {Link} from "react-router-dom";
import IconSvg from "../../platform/components/IconSvg.jsx";

const NavAdminList = () => {
    return (
        <ul className="navigation__list-box">
            {NavListData.map((item, index) => (
                <li className="navigation__list-item" key={index}>
                    <Link to={item.link} className="navigation__list-item__link">
                        <IconSvg width={20} height={20} id={item.icon} />
                        <span>
                            {item.text}
                        </span>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default NavAdminList;