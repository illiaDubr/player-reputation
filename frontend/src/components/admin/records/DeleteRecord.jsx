import React from "react";
import IconSvg from "../../platform/components/IconSvg.jsx";
import {Context} from "../../../api/store/storeContext.js";

const DeleteRecord = ({id}) => {
    const { store } = React.useContext(Context);

    const handleSubmit = (e) => {
        e.preventDefault();

        const deleteData = {
            id: id,
        }

        store.deleteRecord(deleteData);
    }

    return (
        <form method="DELETE" className="" onSubmit={handleSubmit}>
            <button type="submit" className="record__btn">
                <IconSvg width={16} height={16} id="check__mark" /> Просмотрено
            </button>
        </form>
    )
}

export default DeleteRecord;