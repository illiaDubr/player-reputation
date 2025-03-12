import React from "react";
import {Context} from "../../../../../api/store/storeContext.js";

const UserEdit = ({user}) => {
    console.log(user);
    const store = React.useContext(Context);
    if (!user) return null;

    return (
        <form method="PUT" className="">
            <div key={user.id}>
                <label>Комментарий</label>
                <textarea placeholder={user.first_name} />
            </div>
        </form>
    )
}

export default UserEdit;