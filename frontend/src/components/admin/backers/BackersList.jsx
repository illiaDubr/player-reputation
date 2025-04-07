import React from "react";
import FundSelect from "./FundSelect.jsx";
import BackersForm from "./BackersForm.jsx";
import BackersItem from "./BackersItem.jsx";

const BackersList = ({data, control}) => {
    const [selectedFund, setSelectedFund] = React.useState({});

    const handleSelectChange = (backerId, value) => {
        setSelectedFund((prev) => ({
            ...prev,
            [backerId]: value,
        }));
    };

    console.log("фонд", selectedFund);

    const hasContent = (value) => value !== undefined && value !== null && value !== "";
    return (
        <>
            {data.map((item, index) => (
                <div className="admin__box" key={index}>
                    <div className="record backer">
                        <div className="record__top">
                            {control &&
                                <>
                                    <FundSelect
                                        selected={selectedFund[item.backer_id] || ""}
                                        onChange={(value) => handleSelectChange(item.backer_id, value)}/>
                                    <div className="record__form-wrap">
                                        <BackersForm fund={selectedFund[item.backer_id] || ""}
                                                     backerId={item.backer_id}/>
                                    </div>
                                </>
                            }
                        </div>
                        <div className="backer__wrap">
                            {
                                [
                                    {title: "Имя фонда:", content: item.fund_name},
                                    {title: "Email:", content: item.email},
                                    {title: "Описание фонда:", content: item.fundDescr, className: "fundDescr",},
                                    {title: "Ссылка на сайт:", content: item.siteLink},
                                    {title: "Гостевой домик в Discord:", content: item.discordHouse},
                                    {title: "Контакт представителя в Discord:", content: item.discordRepresentative},
                                    {title: "Количество тренеров:", content: item.numberCoach},
                                    {title: "Количество игроков:", content: item.numberPlayer},
                                    {title: "Рейкбек:", content: item.rakeback},
                                    {title: "Дисциплина:", content: item.discipline,}
                                ]
                                    .filter(pair => hasContent(pair.content))
                                    .map((pair, idx) => (
                                        <BackersItem
                                            key={idx}
                                            title={pair.title}
                                            content={pair.content}
                                            className={pair.className}
                                        />
                                    ))
                            }
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default BackersList;