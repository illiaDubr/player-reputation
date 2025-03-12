import React from "react";
import {Context} from "../../../../../api/store/storeContext.js";

const UserEdit = ({user}) => {
    console.log(user);
    const store = React.useContext(Context);
    if (!user) return null;

    return (
        <form method="PUT" className="modal__body">
            <div className="modal__input-box" key={user.id}>
                <label className="label" htmlFor="comment">
                    Комментарий
                </label>
                <textarea className="textarea" id="comment" placeholder={user.comment} />
            </div>
        </form>
    )
}

export default UserEdit;