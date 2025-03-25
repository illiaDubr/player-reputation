import React from "react";
import IconSvg from "../../platform/components/IconSvg.jsx";
import { Context } from "../../../api/store/storeContext.js";

const ReportChangeStatus = ({ id }) => {
    const { store } = React.useContext(Context);

    const handleChangeSubmit = (newStatus) => (e) => {
        e.preventDefault();
        const changeReportData = {
            id,
            status: newStatus,
        };
        store.changeReportStatus(changeReportData);
    };

    return (
        <>
            <form method="PATCH" className="report__form" onSubmit={handleChangeSubmit("read")}>
                <button type="submit" className="report__btn">
                    <IconSvg width={16} height={16} id="trash" />
                </button>
            </form>

            <form method="PATCH" className="report__form" onSubmit={handleChangeSubmit("under_discussion")}>
                <button type="submit" className="report__btn">
                    На рассмотрении
                </button>
            </form>
        </>
    );
};

export default ReportChangeStatus;