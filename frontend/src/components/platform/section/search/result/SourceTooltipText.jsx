import React from "react";
import IconSvg from "../../../components/IconSvg.jsx";
import {Tooltip} from "react-tooltip";

const SourceTooltipText = () => {

    const tooltipId = `resultItem-${Math.random().toString(36).slice(2, 9)}`;

    return (
        <>
            <div className="result__user-status result__user-status--ds" data-tooltip-id={tooltipId}>
                <IconSvg width={22} height={22} id="discord"/>
            </div>
            <Tooltip id={tooltipId} place="bottom" clickable>
                <div className="search__tooltip">
                    Запись была перенесена с Discord-сервера
                </div>
            </Tooltip>
        </>
    )
}

export default SourceTooltipText;