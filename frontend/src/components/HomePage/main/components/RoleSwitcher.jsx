import React from "react";
import {RoleContext} from "./RoleContext.jsx";
import RoleData from "../roleSection/RoleData.jsx";
import TasksData from "../roleSection/TasksData.jsx";
import AuthBtn from "../auth/AuthBtn.jsx";

const RoleSwitcher = ({player, backer, children}) => {
    const { selectedRole, setSelectedRole } = React.useContext(RoleContext);

    return (
        <div className="info__wrap" id={backer ? "tasks__section" : "role__section"}>
            {player && selectedRole === "player" && (
                <h2 className="info__title">
                    Возможности <br />
                    Player Reputation
                </h2>
            )}

            {children}

            {backer && (
                <>
                    {selectedRole === "backer" ? (
                        <div className="tasks__title">
                            <span className="tasks__title-block">
                                Задачи Pr
                                <span></span>
                            </span>
                            - агрегировать информацию обо всех арбитражных записях со всех бекеров СНГ, обеспечивая
                            полный обзор репутации
                        </div>
                    ) : (
                        <div className="tasks__title">
                            <span className="tasks__title-block">
                                Задачи Pr
                                <span></span>
                            </span>
                            - облегчить процесс поиска бекера, а также возможность рассказать свою сторону истории
                        </div>
                    )}
                </>
            )}

            {player  && (
                <div className="role__switch-box">
                    <RoleData roleType={selectedRole} />
                </div>
            )}
            {backer  && (
                <div className="tasks__switch-box">
                    <TasksData tasksType={selectedRole} />
                </div>
            )}

            {backer && (
                <AuthBtn />
            )}
        </div>
    )
}

export default RoleSwitcher;