import React from "react";
import {Tooltip} from "react-tooltip";
import IconSvg from "../../../components/IconSvg.jsx";

const ChangeTooltip = () => {
    const tooltipId = "2";

    return (
        <>
            <div className="search__tooltip-btn" data-tooltip-id={tooltipId} >
                <IconSvg width={16} height={16} id="question" />
            </div>
            <Tooltip id={tooltipId} place="left" clickable>
                <div className="search__tooltip">
                    Сейчас вы вносите изменения в историю  вашего сотрудничества с игроком.
                    Если он был с меткой "Абитраж" и вернул вам полную сумму - отобразите это в
                    комментарии к записи игрока для информации другим бэкерам. Пример "Был должен 500 $,
                    вернул полную сумму в согласованное время"

                    При этом метку "Арбитраж" замените на "Проблемный игрок" (если были проблемы с игроком во
                    время сотрудничества) или "Экс-арбитраж" (если проблем, кроме долга, не было).
                </div>
            </Tooltip>
        </>
    )
}

export default ChangeTooltip;