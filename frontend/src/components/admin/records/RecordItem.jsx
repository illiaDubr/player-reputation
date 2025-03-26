import React from "react";
import RecordChangeStatus from "./RecordChangeStatus.jsx";

const RecordItem = ({data, discussion, closeRecord}) => {
    return (
        <>
            {data.length > 0 ? (
                data.map((item, index) => (
                        <div className="admin__box" key={index}>
                            <div className="record record-record">
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
                                    <div className="">
                                    </div>
                                    <div className="record__form-wrap">
                                        <RecordChangeStatus id={item.id} discussion={discussion} closeRecord={closeRecord}/>
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

export default RecordItem;