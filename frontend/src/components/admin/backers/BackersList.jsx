import React from "react";
import FundSelect from "./FundSelect.jsx";
import BackersForm from "./BackersForm.jsx";
import BackersItem from "./BackersItem.jsx";

const BackersList = ({data}) => {
    const [selectedFund, setSelectedFund] = React.useState(null);


    const hasContent = (value) => value !== undefined && value !== null && value !== "";
    return (
        <>
            {data.map((item, index) => (
                <div className="admin__box" key={index}>
                    <div className="record backer">
                        <div className="record__top">
                            <FundSelect selected={selectedFund} onChange={setSelectedFund}/>
                            <div className="record__form-wrap">
                                <BackersForm fund={selectedFund} backerId={item.backer_id}/>
                            </div>
                        </div>
                        <div className="backer__wrap">
                            {
                                [
                                    { title: "Имя фонда:", content: item.fund_name },
                                    { title: "Email:", content: item.email },
                                    { title: "Описание фонда:", content: item.fundDescr, className: "fundDescr", },
                                    { title: "Ссылка на сайт:", content: item.siteLink },
                                    { title: "Гостевой домик в Discord:", content: item.discordHouse },
                                    { title: "Контакт представителя в Discord:", content: item.discordRepresentative },
                                    { title: "Количество тренеров:", content: item.numberCoach },
                                    { title: "Количество игроков:", content: item.numberPlayer },
                                    { title: "Рейкбек:", content: item.rakeback },
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