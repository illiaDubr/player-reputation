import React from "react";
import RecordsWrap from "@pages/admin/ui/RecordsWrap/index.js";
import RecordItem from "@pages/admin/ui/RecordItem/index.js";

const BackerItemList = ({data, approvedControl}) => {
    const list = Array.isArray(data) ? data : (data?.data || []);
    const hasContent = (value) => value !== undefined && value !== null && value !== "";

    return (
        <>
            {list.map((item, index) => (
                <RecordsWrap className="backer" key={index}>
                    <div className="">
                        {
                            [
                                {title: "Имя фонда", content: approvedControl ? item.fund_name : item.fund_for_search },
                                {title: "Email", content: item.email},
                                {title: "Описание фонда", content: item.fundDescr},
                                {title: "Ссылка на сайт", content: item.siteLink, link: true},
                                {title: "Гостевой домик в Discord", content: item.discordHouse, className: "backer__title--hidden", link: true},
                                {title: "Контакт представителя в Discord", content: item.discordRepresentative, className: "backer__title--hidden"},
                                {title: "Количество тренеров", content: item.numberCoach},
                                {title: "Количество игроков", content: item.numberPlayer},
                                {title: "Рейкбек", content: item.rakeback},
                                {title: "Дисциплина", content: item.discipline,}
                            ]
                                .filter(pair => hasContent(pair.content))
                                .map((pair, idx) => (
                                    <RecordItem
                                        key={idx}
                                        title={pair.title}
                                        content={pair.content}
                                        className={pair.className}
                                        link={pair.link}
                                    />
                                ))
                        }
                    </div>
                </RecordsWrap>
            ))}
        </>
    )
}

export default BackerItemList;