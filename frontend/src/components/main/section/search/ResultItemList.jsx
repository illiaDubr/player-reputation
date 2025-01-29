import React from "react";
import IconSvg from "../../components/IconSvg.jsx";
import ResultItem from "./ResultItem.jsx";

const backerTagConfig = {
    arbitration: {text: "Спорный случай", color: "red"},
    "left poker": {text: "Ушел из покера", color: "orange"},
    "pays off debt": {text: "Погашает долг", color: "yellow"},
    "closed issue": {text: "Рассчитался", color: "green"},
    default: {text: "Нет метки", color: "gray"},
};

function getBackerTagConfig(tag) {
    return backerTagConfig[tag] || backerTagConfig.default;
}

function formatFullName(firstName, lastName, middleName) {
    return `${firstName || ""} ${lastName || ""} ${middleName || ""}`.trim();
}

function formatDate(dateString) {
    if (!dateString) return "-";
    return dateString.slice(0, 10);
}

const dynamicFields = [
    {key: "nickChikoPoker", label: "ChikoPoker:"},
    {key: "Ggpokerok", label: "GgPokerok:"},
    {key: "Ggnetwork", label: "GgNetwork:"},
    {key: "Pokerstars_com", label: "PokerStars.com:"},
    {key: "Pokersters_es", label: "PokerSters.es:"},
    {key: "Winamax_fr", label: "Winamax:"},
    {key: "nickPS", label: "PS:"},
    {key: "nickGG", label: "GG:"},
    {key: "nickRedStar", label: "RedStar:"},
    {key: "nickTigerGaming", label: "TigerGaming:"},
    {key: "nickPartyPoker", label: "PartyPoker:"},
    {key: "nickPokerstars", label: "Pokerstars:"},
    {key: "nick888poker", label: "888poker:"},
    {key: "nickWPNpoker", label: "WPNpoker:"},
    {key: "nickStretchpoker", label: "StretchPoker:"},
    {key: "nickCoinpoker", label: "Coinpoker:"},
    {key: "nickiPoker", label: "iPoker:"},
];

const ResultItemList = ({results = []}) => {
    const [resultInfo, setResultInfo] = React.useState(false);

    const toggleClass = () => {
        setResultInfo((prevState) => !prevState);
    };

    return (
        <div className="result__wrapper">
            {results.map((item) => {
                const {
                    id,
                    backer_tag,
                    first_name,
                    last_name,
                    middle_name,
                    phonenumber,
                    email,
                    discord,
                    fund_name,
                    created_at,
                    amount,
                    comment,
                } = item;

                const {text, color} = getBackerTagConfig(backer_tag);
                const fullName = formatFullName(first_name, last_name, middle_name);
                const date = formatDate(created_at);

                const dynamicFieldItems = dynamicFields
                    .map(({key, label}) => {
                        const fieldValue = item[key];
                        return fieldValue ? {key, content: fieldValue, label} : null;
                    })
                    .filter(Boolean);

                const firstThreeFields = dynamicFieldItems.slice(0, 3);
                const remainingFields = dynamicFieldItems.slice(3);

                const formatAmount = (amount) => {
                    if (!amount || amount.length < 2) return amount; // Проверка на пустое значение
                    return `${amount[0]} ${amount.slice(1)}`;
                };

                return (
                    <div className="result__box" key={id}>
                        <div className="result result-left">
                            <div className="result__title">{fullName}</div>

                            <div className="result__info">
                                {phonenumber && (
                                    <ResultItem
                                        content={phonenumber}
                                        iconId="search__phone"
                                    />
                                )}
                                {email && (
                                    <ResultItem
                                        content={email}
                                        iconId="search__mail"
                                    />
                                )}
                                {discord && (
                                    <ResultItem
                                        content={discord}
                                        iconId="search__discord"
                                        label="Discord:"
                                    />
                                )}

                                {firstThreeFields.map(({key, content, label}) => (
                                    <ResultItem
                                        key={key}
                                        content={content}
                                        label={label}
                                    />
                                ))}
                            </div>

                            {remainingFields.length > 0 && (
                                <>
                                    <div
                                        className={`result__info ${resultInfo ? "result__info-active" : "result__info-close"}`}>
                                        {remainingFields.map(({key, content, label}) => (
                                            <ResultItem
                                                key={key}
                                                content={content}
                                                label={label}
                                            />
                                        ))}
                                    </div>
                                    <button className={`result__btn ${resultInfo ? "result__btn-active" : ""}`}
                                            type="button" onClick={toggleClass}>
                                        {`${resultInfo ? "Свернуть" : "Показать еще"}`}
                                        <IconSvg width={20} height={20} id="arrow"/>
                                    </button>
                                </>
                            )}
                        </div>

                        <div className="result result-right">
                            <div className="result__title">
                                <IconSvg width={48} height={48} id={fund_name}/>
                                <div>
                                    запись от
                                    <br/>
                                    {date}
                                </div>
                            </div>

                            <div className={`result__user-status result__user-status--${color}`}>
                                {text}
                            </div>

                            <div className="result__info">
                                <ResultItem
                                    content={formatAmount(amount)}
                                    label="Сумма ущерба:"
                                    hideIcon
                                    placeholder="Нет данных"
                                />
                                <ResultItem
                                    content={comment}
                                    label="Комментарий от фонда:"
                                    hideIcon
                                    placeholder="Комментарий отсутствует"
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ResultItemList;