import React from "react";
import {Tooltip} from "react-tooltip";
import IconSvg from "../../../components/IconSvg.jsx";

const ChangeTooltip = ({text}) => {
    const tooltipId = "2";

    return (
        <>
            <div className="search__tooltip-btn" data-tooltip-id={tooltipId} >
                <IconSvg width={16} height={16} id="question" />
            </div>
            <Tooltip id={tooltipId} place="left" clickable>
                <div className="search__tooltip">
                    {text}
                </div>
            </Tooltip>
        </>
    )
}

export default ChangeTooltip;