import React from "react";
import {Context} from "../../../../../api/store/storeContext.js";

const UserEdit = ({user}) => {
    console.log(user);
    const {store} = React.useContext(Context);

    const [comment, setComment] = React.useState(user?.comment || "");

    if (!user) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            comment,
            player_id: user.player_id,
            id: user.reputation_records?.[0]?.id,
        };
        console.log(payload);
        store.userEdit(payload);
    };

    return (
        <form method="PATCH" className="modal__body" onSubmit={handleSubmit}>
            <div className="modal__input-box" key={user.id}>
                <label className="label" htmlFor="comment">
                    Комментарий
                </label>
                <textarea className="textarea" id="comment" value={comment} onChange={(e) => setComment(e.target.value)}>
                    {user.comment}
                </textarea>
            </div>
            <button type="submit" className="modal__form-btn">
                Изменить
            </button>
        </form>
    )
}

export default UserEdit;