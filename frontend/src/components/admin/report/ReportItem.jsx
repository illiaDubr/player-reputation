import React from "react";
import ReportEdit from "./ReportEdit.jsx";
import ReportChangeStatus from "./ReportChangeStatus.jsx";

const ReportItem = ({data, tagEdit, discussion}) => {
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
                                <div className="report__form-wrap">
                                    {tagEdit && (
                                        <ReportEdit tag={item.backer_tag} playerId={item.player_id} recordId={item.id}/>
                                    )}
                                    <ReportChangeStatus id={item.id} discussion={discussion}/>
                                </div>
                            </div>
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
                <div className="admin__no-data">
                    Данных нет
                </div>
            )}
        </>
    )
}

export default ReportItem;