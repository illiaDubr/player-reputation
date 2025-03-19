import React from "react";
import {editData} from "../../../../../utils/EditData.js";
import IconSvg from "../../../components/IconSvg.jsx";
import {useModal} from "../../../components/Modal.jsx";

const PlayerManagement = () => {
    const {openModal} = useModal();

    const openEditModal = () => {
        openModal("edit");
    }

    const openReportModal = () => {
        openModal("report");
    }

    const actions = {
        openReportModal: openReportModal,
        openEditModal: openEditModal,
    };

    return (
        <div className="result__edit-wrap">
            {editData.map((item, index) => (
                <button className="result__edit" type="button" key={index} onClick={() => actions[item.modal]}>
                    <IconSvg width={16} height={16} id={item.img}/> {item.text}
                </button>
            ))}
        </div>
    )
}

export default PlayerManagement;