import React from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const BackersItem = ({ content, title, className, link }) => {
    const idSuffix = Math.random().toString(36).slice(2, 9);
    const showTitleTooltip = Boolean(className);
    const titleTooltipId = `titleTooltip-${idSuffix}`;
    const contentTooltipId = `contentTooltip-${idSuffix}`;

    return (
        <div className="backer__item">
            <div className="backer__title-wrap">
                <div
                    className={`backer__title${className ? ` ${className}` : ""}`}
                    data-tooltip-id={showTitleTooltip ? titleTooltipId : undefined}
                >
                    {title}
                </div>
                <div className="">:</div>
            </div>

            {link ? (
                <a href={content} className="backer__text" data-tooltip-id={contentTooltipId}>
                    {content}
                </a>
            ) : (
                <div className="backer__text" data-tooltip-id={contentTooltipId}>
                    {content}
                </div>
            )}

            {showTitleTooltip && (
                <Tooltip id={titleTooltipId} place="top" clickable>
                    <div className="backer__tooltip">{title}</div>
                </Tooltip>
            )}

            <Tooltip id={contentTooltipId} place="top" clickable>
                <div className="backer__tooltip">{content}</div>
            </Tooltip>
        </div>
    );
};

export default BackersItem;