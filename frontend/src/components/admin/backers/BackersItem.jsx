import React from "react";
import {Tooltip} from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const BackersItem = ({content, title, className}) => {

    const tooltipId = `resultItem-${Math.random().toString(36).slice(2, 9)}`;

    return (
        <div className="backer__item">
            <div className="backer__title">
                {title}
            </div>
            <div className={`backer__text ${className}`} data-tooltip-id={tooltipId}>
                {content}
            </div>
            <Tooltip id={tooltipId} place="top">
                <div className="backer__tooltip">
                    {content}
                </div>
            </Tooltip>
        </div>
    )
}

export default BackersItem;