import React from 'react';
import AdminMain from "../../components/admin/AdminMain.jsx";
import "../../style/admin/admin.scss"
import {observer} from "mobx-react-lite";
import {Context} from "../../api/store/storeContext.js";
import {NavListData} from "../../utils/AdminData.js";
import {Link} from "react-router-dom";
import IconSvg from "../../components/platform/components/IconSvg.jsx";

const Admin = observer(() => {
    const { store } = React.useContext(Context);


    const randomTop = Math.floor(Math.random() * 350) + "px";
    const randomLeft = Math.floor(Math.random() * 350) + "px";

    return (
        <AdminMain pageTitle="Панель Администратора">
            <div className="admin__wrap">
                <div className="admin__link-wrap">
                    {NavListData.map((item, index) => (
                        <Link to={item.link} className="admin__link" key={index}>
                            <span style={{top: randomTop, left: randomLeft}}></span>
                            <div className="admin__link-text">
                                {item.link_text}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </AdminMain>
    );
})

export default Admin;