import React from "react";
import {Context} from "../../../api/store/storeContext.js";

const RecordChangeStatus = ({discussion, id, closeRecord}) => {
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
            {discussion &&
                <form method="PATCH" className="record__form-wrap" onSubmit={handleChangeSubmit("under_discussion")}>
                    <button type="submit" className="record__btn">
                        На обсуждении
                    </button>
                </form>
            }
            {closeRecord &&
                <form method="PATCH" className="record__form-wrap" onSubmit={handleChangeSubmit("read")}>
                    <button type="submit" className="record__btn">
                        Просмотрено
                    </button>
                </form>
            }
        </>
    )
}

export default RecordChangeStatus;