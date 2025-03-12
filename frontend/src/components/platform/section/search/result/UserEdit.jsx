import React from "react";
import {Context} from "../../../../../api/store/storeContext.js";

const UserEdit = ({user}) => {
    console.log(user);
    const store = React.useContext(Context);

    return (
        <form method="PUT" className="">
            {user.map(user => (
                <div key={user.id}>
                    <label>
                        Комментарий
                    </label>
                    <textarea placeholder={user.comment}>
                    </textarea>
                </div>
            ))}
        </form>
    )
}

export default UserEdit;