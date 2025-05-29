import React from "react";
import styles from "./ResultItemActions.module.scss";
import IconSvg from "@shared/ui/IconSvg/index.js";
import {useModal} from "@app/providers/index.jsx";

const ResultItemActions = ({checked, player}) => {
    const {openModal} = useModal();

    return (
        <div className={styles[`result__actions-wrap`]}>
            {checked ? (
                <button className={styles[`result__actions`]} type="button" onClick={() => openModal('Actions', {origin: "edit", title: "Изменить данные", player: player})}>
                    <IconSvg width={16} height={16} id="pen"/>
                </button>
            ) : (
                <button className={styles[`result__actions`]} type="button" onClick={() => openModal('Actions', {origin: "report", title: "Отправить репорт", player: player})}>
                    <IconSvg width={16} height={16} id="danger_triangle"/> Сообщить об ошибке метки
                </button>
            )}
        </div>
    )
}

export default ResultItemActions;