import React from "react";
import IconSvg from "../../../components/IconSvg.jsx";

const Report = ({backer, user}) => {

    if (!user) return null;

    console.log(user.player_id);

    const handleSubmit = (e) => {
        e.preventDefault();
        const report = {
            id: backer.id,
        }
    }

    return (
        <form method="POST" >
            <button className="result__edit" type="submit">
                <IconSvg width={16} height={16} id="danger_triangle"/> Репорт метки {backer.id}
            </button>
        </form>
    )
}

export default Report;