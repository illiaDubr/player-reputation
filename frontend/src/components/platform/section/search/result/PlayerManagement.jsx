import React from "react";
import {editData} from "../../../../../utils/EditData.js";
import IconSvg from "../../../components/IconSvg.jsx";
import {useModal} from "../../../components/Modal.jsx";

const PlayerManagement = ({user}) => {
    const {openModal} = useModal();

    const openEditModal = (user) => {
        openModal("edit");
    }

    const openReportModal = (user) => {
        openModal("report");
    }

    if (!user) return null;

    const actions = {
        openReportModal: openReportModal,
        openEditModal: openEditModal,
    };

    return (
        <div className="result__edit-wrap">
            {editData.map((item, index) => (
                <button className="result__edit" type="button" key={index}  onClick={() => actions[item.modal](user)}>
                    <IconSvg width={16} height={16} id={item.img}/> {item.text}
                </button>
            ))}
        </div>
    )
}

export default PlayerManagement;