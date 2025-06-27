import React from "react";
import ResultItem from "@features/search/player-search/ui/SearchResult/ui/ResultItemList/ui/ResultItem";

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

    if (src === "discord" || (hasDmg && !hasMakeUp)) {
        return (
            <ResultItem
                content={formatDamage(damage + makeup)}
                title="Сумма претензии"
            />
        );
    }

    if (hasDmg && hasMakeUp) {
        return (
            <>
                <ResultItem
                    content={formatDamage(damage)}
                    title="Сумма ущерба"
                />
                <ResultItem
                    content={formatDamage(makeup)}
                    title="Сумма мейкапа"
                />
            </>
        );
    }

    return null;
};

export default ClaimAmount;