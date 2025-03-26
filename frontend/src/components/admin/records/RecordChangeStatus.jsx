import React from "react";
import {Context} from "../../../api/store/storeContext.js";
import IconSvg from "../../platform/components/IconSvg.jsx";

const RecordChangeStatus = ({discussion, id}) => {
    const {store} = React.useContext(Context);

    const handleChangeSubmit = (newStatus) => (e) => {
        e.preventDefault();
        const changeRecordData = {
            id: id,
            status: newStatus,
        }

        store.changeRecordStatus(changeRecordData);
    }

    return (
        <>
            <form method="PATCH" className="report__form" onSubmit={handleChangeSubmit("read")}>
                <button type="submit" className="report__btn">
                    <IconSvg width={16} height={16} id="trash"/>
                </button>
            </form>
            {discussion &&
                <form method="PATCH" className="report__form" onSubmit={handleChangeSubmit("read")}>
                    <button type="submit" className="report__btn">
                        На рассмотрении
                    </button>
                </form>
            }
        </>
    )
}

export default RecordChangeStatus;