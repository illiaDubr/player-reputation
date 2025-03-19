import React from "react";
import {editFormData} from "../../../../../utils/EditData.js";

const PlayerManagementForm = ({currentModal}) => {
    return (
        <>
            {editFormData.filter((item) => item.name === currentModal).map((item, index) => (
                <form method={item.method} key={index}>
                    <button type="submit" className="modal__form-btn">
                        {item.button}
                    </button>
                </form>
            ))}
        </>
    )
}

export default PlayerManagementForm;