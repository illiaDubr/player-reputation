import {useState} from "react";
import IconSvg from "../../components/IconSvg.jsx";
import {Tooltip} from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const ResultItem = ({content, iconId, label, hideIcon, placeholder}) => {
    const [randomBorderColor] = useState(getRandomColor());

    const tooltipId = `resultItem-${Math.random().toString(36).slice(2, 9)}`;

    const copyToClipboard = (text) => {
        if (!text) {
            console.error("Нечего копировать: текст пустой!");
            return;
        }

        navigator.clipboard.writeText(text)
            .then(() => {
                console.log("Текст успешно скопирован:", text);
                alert("Текст скопирован в буфер обмена!");
            })
            .catch((err) => {
                console.error("Ошибка при копировании текста:", err);
                alert("Не удалось скопировать текст.");
            });
    };

    return (
        <div className="result__text">
            <div className="result__head">
                {!hideIcon && (
                    iconId ? (
                        <IconSvg width={20} height={20} id={iconId}/>
                    ) : (
                        <span style={{borderColor: randomBorderColor}}/>
                    )
                )}
                {label && <div className="result__label">{label}</div>}
            </div>
            <div className="result__content" data-tooltip-id={tooltipId}>
                {content
                    ? content
                    : hideIcon
                        ? placeholder || "—"
                        : null}
            </div>
            <Tooltip id={tooltipId} place="top" clickable>
                <div className="result__tooltip">
                    {content}
                    <button className="result__tooltip-btn" onClick={() => copyToClipboard(content)}>Скопировать
                    </button>
                </div>
            </Tooltip>
        </div>
    );
};

export default ResultItem;