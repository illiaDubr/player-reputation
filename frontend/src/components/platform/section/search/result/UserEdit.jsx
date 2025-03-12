import React from "react";
import {Context} from "../../../../../api/store/storeContext.js";

const UserEdit = ({user}) => {
    console.log(user);
    const store = React.useContext(Context);

    return (
        <form method="PUT" className="">
            {(user || []).map(u => (
                <div key={u.id}>
                    <label>Комментарий</label>
                    <textarea placeholder={u.first_name} />
                </div>
            ))}
        </form>
    )
}

export default UserEdit;