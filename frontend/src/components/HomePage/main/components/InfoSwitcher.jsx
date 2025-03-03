import React from "react";
import Auth from "../auth/Auth.jsx";
import {RoleContext} from "./RoleContext.jsx";
import RoleData from "../switchSection/RoleData.jsx";
import TasksData from "../switchSection/TasksData.jsx";

const InfoSwitcher = ({player, backer}) => {
    const { selectedRole, setSelectedRole } = React.useContext(RoleContext);

    return (
        <div className="info__wrap" id={backer ? "tasks__section" : "role__section"}>
            {player && selectedRole === "player" && (
                <div className="info__player-title">
                    Возможности <br />
                    Player Reputation
                </div>
            )}

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

            {backer && (
                <div className="tasks__title">
                    {selectedRole === "backer" ? (
                        <div className="tasks__title-backer">
                            <span className="tasks__title-block">
                                Задачи Pr
                                <span></span>
                            </span>
                            - агрегировать информацию обо всех арбитражных записях со всех бекеров СНГ, обеспечивая
                            полный обзор репутации
                        </div>
                    ) : (
                        <div className="tasks__title-player">
                            <span className="tasks__title-block">
                                Задачи Pr
                                <span></span>
                            </span>
                            - облегчить процесс поиска бекера, а также возможность рассказать свою сторону истории
                        </div>
                    )}
                </div>
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


            {/*<div className="tasks__switch-box">
                {selectedRole === "backer" ? (
                    <div className="tasks__switch backer"></div>
                ) : (
                    <div className="tasks__switch player"></div>
                )}
            </div>
            */}

            {backer && (
                <Auth/>
            )}
        </div>
    )
}

export default InfoSwitcher;