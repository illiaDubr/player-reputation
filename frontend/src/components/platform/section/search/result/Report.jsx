import React from "react";
import IconSvg from "../../../components/IconSvg.jsx";

const Report = ({backer}) => {


    return (
        <button className="result__edit" type="button">
            <IconSvg width={16} height={16} id="danger_triangle"/> Репорт метки {backer.id}
        </button>
    )
}

export default Report;