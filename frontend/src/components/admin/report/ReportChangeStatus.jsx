import React from "react";
import IconSvg from "../../platform/components/IconSvg.jsx";
import {Context} from "../../../api/store/storeContext.js";

const ReportChangeStatus = ({id, discussion}) => {
    const {store} = React.useContext(Context);

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
            {discussion && (
                <form method="PATCH" className="record__form" onSubmit={handleChangeSubmit("under_discussion")}>
                    <button type="submit" className="record__btn">
                        На рассмотрении
                    </button>
                </form>
            )}

            <form method="PATCH" className="record__form" onSubmit={handleChangeSubmit("read")}>
                <button type="submit" className="record__btn">
                    <IconSvg width={16} height={16} id="trash"/>
                </button>
            </form>
        </>
    );
};

export default ReportChangeStatus;