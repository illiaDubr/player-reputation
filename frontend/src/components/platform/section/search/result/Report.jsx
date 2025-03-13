import React from "react";
import IconSvg from "../../../components/IconSvg.jsx";

const Report = ({user}) => {
    console.log(`user: ${JSON.stringify(user)}`);

    if (!user) return null;
    return (
        <button className="result__edit" type="button">
            <IconSvg width={16} height={16} id="danger_triangle"/> Репорт метки
        </button>
    )
}

export default Report;