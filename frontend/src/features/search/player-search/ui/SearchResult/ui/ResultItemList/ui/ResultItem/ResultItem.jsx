import React from "react";
import styles from "./ResultItem.module.scss";
import {Tooltip} from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import IconSvg from "@shared/ui/IconSvg";

const MAX_LENGTH = 160;

const ResultItem = ({title, content, iconId, className}) => {
    const tooltipId = React.useMemo(() => `resultItem-${Math.random().toString(36).slice(2, 9)}`, []);
    const [copied, setCopied] = React.useState(false);

    const [expanded, setExpanded] = React.useState(false);
    const isLong = typeof content === "string" && content.length > MAX_LENGTH;
    const shortText = isLong ? content.slice(0, MAX_LENGTH) + "..." : content;

    const displayText = isLong && !expanded ? shortText : content;

    const copyToClipboard = React.useCallback((text) => {
        if (!text) return;
        navigator.clipboard.writeText(text)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
            });
    }, []);

    return (
        <div className={`${styles["player__item"]}${className ? ` ${styles[`${className}`]}` : ""}`}>
            <div className={styles[`player__item-icon`]}>
                {iconId && <IconSvg width={20} height={20} id={iconId} />}

                {title && <div className={styles[`player__item-title`]}>{title}:</div>}
            </div>
            <div className={styles[`player__item-content`]} data-tooltip-id={tooltipId} tabIndex={0}>
                {displayText}
                {isLong && (
                    <button
                        type="button"
                        className={styles["player__item-expand-btn"]}
                        onClick={() => setExpanded((prev) => !prev)}
                    >
                        {expanded ? "Скрыть" : "Показать еще"}
                    </button>
                )}
            </div>
            {!className && (
                <Tooltip id={tooltipId} place="top" clickable>
                    <div className={styles[`player__item-tooltip`]}>
                        {content}
                        <button type="button" className={styles[`player__item-tooltip-btn`]} onClick={() => copyToClipboard(content)}
                                disabled={copied}>
                            {copied ? "Скопировано!" : "Скопировать"}
                        </button>
                    </div>
                </Tooltip>
            )}
        </div>
    )
}

export default ResultItem;