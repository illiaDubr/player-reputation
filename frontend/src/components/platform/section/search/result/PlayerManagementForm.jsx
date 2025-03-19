import React from "react";
import {editFormData} from "../../../../../utils/EditData.js";

const PlayerManagementForm = ({currentModal, backer, user}) => {

    if (!user) return null;

    console.log(user.player_id);
    console.log(user);

    return (
        <>
            {editFormData.filter((item) => item.name === currentModal).map((item, index) => (
                <form method={item.method} key={index} className="modal__body">
                    <button type="submit" className="modal__form-btn">
                        {item.button}
                    </button>
                </form>
            ))}
        </>
    )
}

export default PlayerManagementForm;