import React from "react";
import FundSelect from "./FundSelect.jsx";
import BackersForm from "./BackersForm.jsx";
import BackersItem from "./BackersItem.jsx";
import FreezeControl from "./FreezeControl.jsx";
import {fundsData} from "../../../utils/BackersData.js";
import AppSelect from "../../platform/components/AppSelect.jsx";

const BackersItemList = ({data, approvedControl, freezeControl}) => {
    const [selectedFund, setSelectedFund] = React.useState({});
    const [correctRequest, setCorrectRequest] = React.useState({});

    const setCorrectRequestData = (recordId, value) => {
        setCorrectRequest((prev) => ({
            ...prev,
            [recordId]: value,
        }));
    };

    const handleSelectFundChange = (backerId) => (selected) => {
        setSelectedFund((prev) => ({
            ...prev,
            [backerId]: selected.value,
        }));
    };

    console.log("фонд", selectedFund);

    const hasContent = (value) => value !== undefined && value !== null && value !== "";
    return (
        <>
            {data.length > 0 ? (
                data.map((item, index) => (
                    <div className="admin__box" key={index}>
                        <div className="record backer">
                            {correctRequest[item.backer_id] ? (
                                <div className="record__correct">
                                    Готово!
                                </div>
                            ) : (
                                <>
                                    <div className="record__top">
                                        {approvedControl &&
                                            <>
                                                {/*
                                                <FundSelect
                                                    selected={selectedFund[item.backer_id] || ""}
                                                    onChange={(value) => handleSelectChange(item.backer_id, value)}/>*/}
                                                <AppSelect
                                                    rawOptions={fundsData}
                                                    labelKey="fundName"
                                                    valueKey="fundName"
                                                    onChange={handleSelectFundChange(item.backer_id)}
                                                    placeholder="Выберете фонд.."
                                                    isSearchable={true}
                                                />
                                                <div className="record__form-wrap">
                                                    <BackersForm setCorrectRequestData={setCorrectRequestData} fund={selectedFund[item.backer_id] || ""} backerId={item.backer_id} />
                                                </div>
                                            </>
                                        }
                                        {freezeControl &&
                                            <div className="record__form-wrap">
                                                <FreezeControl setCorrectRequestData={setCorrectRequestData} backerId={item.backer_id}/>
                                            </div>
                                        }
                                    </div>
                                    <div className="backer__wrap">
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
                                                    <BackersItem
                                                        key={idx}
                                                        title={pair.title}
                                                        content={pair.content}
                                                        className={pair.className}
                                                        link={pair.link}
                                                    />
                                                ))
                                        }
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <>
                    {approvedControl && (
                        <div className="admin__no-data">
                            Новых заявок не было
                        </div>
                    )}
                </>
            )}

        </>
    )
}

export default BackersItemList;