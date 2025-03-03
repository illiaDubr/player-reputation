import React from "react";
import {RoleContext} from "./RoleContext.jsx";

const Switcher = () => {
    const { selectedRole, setSelectedRole } = React.useContext(RoleContext);

    return (
        <div className="info__switch-wrap">
            <div className="gradient-text">
                Выберите свою роль
            </div>
            <div className="info__switch-box">
                <div
                    className={`info__switch ${selectedRole === "backer" ? "active" : ""}`}
                    onClick={() => setSelectedRole("backer")}
                >
                    Я бэкер
                </div>
                <div
                    className={`info__switch ${selectedRole === "player" ? "active" : ""}`}
                    onClick={() => setSelectedRole("player")}
                >
                    Я игрок
                </div>
            </div>
        </div>
    )
}

export default Switcher;