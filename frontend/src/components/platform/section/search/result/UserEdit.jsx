import React from "react";
import {Context} from "../../../../../api/store/storeContext.js";

const UserEdit = ({user}) => {
    const {store} = React.useContext(Context);
    const [formData, setFormData] = React.useState({
        comment: user?.comment || "",
        damage: user?.damage || "",
    });

    if (!user) return null;

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const finalComment = formData.comment.trim() ? formData.comment : user.comment;
        const finalDamage = formData.damage.trim() ? formData.damage : user.damage;

        const payload = {
            comment: finalComment,
            damage: finalDamage,
            player_id: user.player_id,
            id: user.reputation_records?.[0]?.id,
            makeUp: 0,
        };
        console.log(payload);
        store.userEdit(payload);
    };

    return (
        <form method="PATCH" className="modal__body" onSubmit={handleSubmit}>
            <div className="modal__input-box">
                <label htmlFor="damage" className="label">
                    Сумма ущерба
                </label>
                <input id="damage" name="damage" className="input" placeholder={user.damage} value={formData.damage}
                       onChange={handleChange}/>
            </div>
            <div className="modal__input-box">
                <label className="label" htmlFor="comment">
                    Комментарий
                </label>
                <textarea name="comment" className="textarea" id="comment" value={formData.comment}
                          onChange={handleChange} placeholder={user.comment}>
                </textarea>
            </div>
            <button type="submit" className="modal__form-btn">
                Изменить
            </button>
        </form>
    )
}

export default UserEdit;