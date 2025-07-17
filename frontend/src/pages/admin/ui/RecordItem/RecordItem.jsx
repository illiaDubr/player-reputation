import React from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import styles from "./RecordItem.module.scss";

const RecordItem = ({ content, title, className, link }) => {
    const idSuffix = Math.random().toString(36).slice(2, 9);
    const showTitleTooltip = Boolean(className);
    const titleTooltipId = `titleTooltip-${idSuffix}`;
    const contentTooltipId = `contentTooltip-${idSuffix}`;

    return (
        <div className={styles[`record__item`]}>
            <div className={styles[`record__title-wrap`]}>
                <div
                    className={`${styles["record__title"]}${className ? ` ${styles[className]}` : ""}`}
                    data-tooltip-id={showTitleTooltip ? titleTooltipId : undefined}
                >
                    {title}:
                </div>
            </div>

            {link ? (
                <a href={content} className={styles[`record__text`]} data-tooltip-id={contentTooltipId}>
                    {content}
                </a>
            ) : (
                <div className={styles[`record__text`]} data-tooltip-id={contentTooltipId}>
                    {content}
                </div>
            )}

            {showTitleTooltip && (
                <Tooltip id={titleTooltipId} place="top" clickable>
                    <div className={styles[`record__tooltip`]}>{title}</div>
                </Tooltip>
            )}

            <Tooltip id={contentTooltipId} place="top" clickable>
                <div className={styles[`record__tooltip`]}>{content}</div>
            </Tooltip>
        </div>
    );
};

export default RecordItem;