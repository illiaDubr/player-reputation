import React from "react";

const ReportEdit = ({tag}) => {
    return (
        <form method="PATCH" className="report__form">
            <button className="report__btn" type="submit">
                Обновить метку
            </button>
        </form>
    )
}

export default ReportEdit;