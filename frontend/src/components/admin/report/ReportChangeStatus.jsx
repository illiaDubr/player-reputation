import React from "react";
import IconSvg from "../../platform/components/IconSvg.jsx";
import {Context} from "../../../api/store/storeContext.js";

const ReportChangeStatus = ({id}) => {
    const { store } = React.useContext(Context);

    const handleChangeSubmit= (e) => {
        e.preventDefault();

        const changeReportData = {
            id: id,
            status: "read",
        }

        store.changeReportStatus(changeReportData);
    }

    return (
        <form method="PATCH" className="" onSubmit={handleChangeSubmit}>
            <button type="submit" className="report__btn">
                <IconSvg width={16} height={16} id="trash" />
            </button>
        </form>
    )
}

export default ReportChangeStatus;