import React from "react";
import ReportEdit from "./ReportEdit.jsx";

const ReportItem = ({data, tagEdit, closeReport}) => {
    const [correctRequest, setCorrectRequest] = React.useState(false);

    console.log(data);
    console.log(correctRequest)
    return (
        <>
            {data.length > 0 ? (
                data.map((item, index) => (
                    <div className="admin__box" key={index}>
                        <div className="record report">
                            <div className="record__top">
                                <div className="record__title">
                                    {item.reporter_name}
                                </div>
                                <div className="record__form-wrap">
                                    {tagEdit && (
                                        <ReportEdit closeReport={closeReport} setCorrectRequest={setCorrectRequest} playerId={item.player_id} recordId={item.id} tag={item.backer_tag}/>
                                    )}
                                </div>
                            </div>
                            {!closeReport && (
                                <div className="record__text">
                                    <div className="record__text-title">
                                        Новая метка:
                                    </div>
                                    <div className="record__text-desc">
                                        {item.backer_tag}
                                    </div>
                                </div>
                            )}
                            <div className="record__text">
                                <div className="record__text-title">
                                    Имя игрока:
                                </div>
                                <div className="record__text-desc">
                                    {item.player_last_name} {item.player_first_name}
                                </div>
                            </div>
                            <div className="record__text">
                                <div className="record__text-title">
                                    Ущерб:
                                </div>
                                <div className="record__text-desc">
                                    {item.damage} $
                                </div>
                            </div>
                            <div className="record__text">
                                <div className="record__text-title">
                                    Комментарий:
                                </div>
                                <div className="record__text-desc">
                                    {item.reputation_comment}
                                </div>
                            </div>
                            <div className="record__text">
                                <div className="record__text-title">
                                    Причина смены метки:
                                </div>
                                <div className="record__text-desc">
                                    {item.report_comment}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (

                <>
                    {closeReport && (
                        <div className="admin__no-data">
                            Новых репортов не было
                        </div>
                    )}
                </>
            )}
        </>
    )
}

export default ReportItem;