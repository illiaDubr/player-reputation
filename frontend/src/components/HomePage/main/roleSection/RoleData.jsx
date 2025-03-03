import React from "react";

const RoleData = ({ roleType }) => {

    switch (roleType) {
        case "backer":
            return (
                <>
                </>
            );

        case "player":
            return (
                <>
                    <div className="role__card-player">
                    </div>
                    <div className="role__card-player">
                    </div>
                    <div className="role__card-player">
                    </div>
                    <div className="role__card-player">
                    </div>
                </>
            );

        default:
            return null;
    }
};

export default RoleData;