import React from "react";
import RecordChangeStatus from "./RecordChangeStatus.jsx";
import IconSvg from "../../platform/components/IconSvg.jsx";

const RecordList = ({data, discussion, closeRecord}) => {
    return (
        <>
            {data.length > 0 ? (
                data.map((item, index) => (
                        <div className="admin__box" key={index}>
                            <div className="record record-record">
                                <div className="record__top">
                                    <div className="record__title">
                                        Было
                                    </div>
                                </div>
                                <div className="record__text">
                                    <div className="record__text-title">
                                        Фонд
                                    </div>
                                    <div className="record__text-desc">
                                        {item.fund_name}
                                    </div>
                                </div>
                                <div className="record__text">
                                    <div className="record__text-title">
                                        Ущерб:
                                    </div>
                                    <div className="record__text-desc">
                                        {item.old_data.damage}$
                                    </div>
                                </div>
                                <div className="record__text">
                                    <div className="record__text-title">
                                        Комментарий:
                                    </div>
                                    <div className="record__text-desc">
                                        {item.old_data.comment}
                                    </div>
                                </div>
                            </div>
                            <div className="record record-record">
                                <div className="record__top">
                                    <div className="record__title">
                                        Стало
                                    </div>
                                    <div className="record__form-wrap">
                                        <RecordChangeStatus id={item.id} discussion={discussion} closeRecord={closeRecord}/>
                                    </div>
                                </div>
                                <div className="record__text">
                                    <div className="record__text-title">
                                        Фонд
                                    </div>
                                    <div className="record__text-desc">
                                        {item.fund_name}
                                    </div>
                                </div>
                                <div className="record__text">
                                    <div className="record__text-title">
                                        Ущерб:
                                    </div>
                                    <div className="record__text-desc">
                                        {item.new_data.damage}$
                                    </div>
                                </div>
                                <div className="record__text">
                                    <div className="record__text-title">
                                        Комментарий:
                                    </div>
                                    <div className="record__text-desc">
                                        {item.new_data.comment}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
            ) : (
                <div className="admin__no-data">
                </div>
            )}
        </>
    )
}

export default RecordList;