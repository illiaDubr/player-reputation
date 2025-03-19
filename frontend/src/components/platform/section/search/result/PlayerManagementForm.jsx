import React from "react";
import {editFormData} from "../../../../../utils/EditData.js";

const PlayerManagementForm = ({currentModal, backer, user}) => {

    if (!user) return null;

    return (
        <>
            {editFormData.filter((item) => item.name === currentModal).map((item, index) => (
                <form method={item.method} key={index} className="modal__body">
                    {item.name === "report" && (
                        <div className="modal__input-box">
                            <label className="label" htmlFor="comment">
                                Комментарий
                            </label>
                            <textarea name="comment" className="textarea" id="comment">
                            </textarea>
                        </div>
                    )}
                    {item.name === "edit" && (
                        <>
                            <div className="modal__input-box">
                                <label htmlFor="damage" className="label">
                                    Сумма ущерба
                                </label>
                                <input id="damage" name="damage" className="input"/>
                            </div>
                            <div className="modal__input-box">
                                <label className="label" htmlFor="comment">
                                    Комментарий
                                </label>
                                <textarea name="comment" className="textarea" id="comment">
                                </textarea>
                            </div>
                        </>
                    )}
                    <button type="submit" className="modal__form-btn">
                        {item.button}
                    </button>
                </form>
            ))}
        </>
    )
}

export default PlayerManagementForm;