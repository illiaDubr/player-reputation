import React from "react";
import IconSvg from "../../platform/components/IconSvg.jsx";
import {Context} from "../../../api/store/storeContext.js";

const ReportChangeStatus = ({id, disabled, setCorrectRequest}) => {
    const {store} = React.useContext(Context);

    const handleChangeSubmit = (newStatus) => (e) => {
        e.preventDefault();
        const changeReportData = {
            id,
            status: newStatus,
        };
        store.changeReportStatus(changeReportData)
            .then((response) => {
                if (response.status === 200) {
                    setCorrectRequest(true);
                    console.log(response);
                }
            })
    };

    return (
        <form method="PATCH" className="record__form" onSubmit={handleChangeSubmit("read")}>
            <button type="submit" className="record__btn" disabled={disabled}>
                Оставить метку без изменений
            </button>
        </form>
    );
};

export default ReportChangeStatus;