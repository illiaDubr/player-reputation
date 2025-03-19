import React from "react";
import {editFormData} from "../../../../../utils/EditData.js";
import {Context} from "../../../../../api/store/storeContext.js";
import {useModal} from "../../../components/Modal.jsx";

const PlayerManagementForm = ({currentModal, backer, user}) => {
    const {store} = React.useContext(Context);
    const {closeAllModals} = useModal();

    if (!user) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            if (currentModal === "report") {
                const report = {
                    id: backer,
                    player_id: user.player_id,
                    backer_tag: user.backer_tag,
                    comment: data.comment,
                }
                console.log("Отправляем report:", report);
                store.report(report);
                closeAllModals();
            } else if (currentModal === "edit") {
                const finalComment = data.comment.trim() ? data.comment : user.comment;
                const finalDamage = data.damage.trim() ? data.damage : user.damage;

                const payload = {
                    comment: finalComment,
                    damage: finalDamage,
                    player_id: user.player_id,
                    id: user.reputation_records?.[0]?.id,
                    makeUp: 0,
                }
                console.log("Отправляем payload:", payload);
                store.userEdit(payload);
                closeAllModals();
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {editFormData.filter((item) => item.name === currentModal).map((item, index) => (
                <form method={item.method} key={index} className="modal__body" onSubmit={handleSubmit}>
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