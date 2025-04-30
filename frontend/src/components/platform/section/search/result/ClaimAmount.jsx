import React from "react";
import ResultItem from "./ResultItem.jsx";

function formatDamage(damage) {
    if (damage == null || damage === "") return "$0.00";

    const number = Number(damage);
    if (isNaN(number)) return damage;

    return `$${number.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
}

const ClaimAmount = ({ dmg, src, makeUp }) => {
    const damage = parseFloat(dmg) || 0;
    const makeup = parseFloat(makeUp) || 0;
    const hasDmg = dmg !== null && dmg !== undefined;
    const hasMakeUp = makeUp !== null && makeUp !== undefined;

    // Если источник discord или только dmg без makeUp
    if (src === "discord" || (hasDmg && !hasMakeUp)) {
        return (
            <ResultItem
                content={formatDamage(damage + makeup)}
                label="Сумма претензии:"
                hideIcon
                placeholder="Нет данных"
            />
        );
    }

    // Если есть и dmg и makeUp
    if (hasDmg && hasMakeUp) {
        return (
            <>
                <ResultItem
                    content={formatDamage(damage)}
                    label="Сумма ущерба:"
                    hideIcon
                    placeholder="Нет данных"
                />
                <ResultItem
                    content={formatDamage(makeup)}
                    label="Сумма мейкапа:"
                    hideIcon
                    placeholder="Нет данных"
                />
            </>
        );
    }

    return null;
};

export default ClaimAmount;