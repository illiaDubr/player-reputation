import React from "react";

const TasksData = ({ tasksType }) => {

    switch (tasksType) {
        case "backer":
            return (
                <div className="role-content">
                    backer
                </div>
            );

        case "player":
            return (
                <div className="role-content">
                    player
                </div>
            );

        default:
            return null;
    }
};

export default TasksData;