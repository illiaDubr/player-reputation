import React from "react";
import IconSvg from "../../../components/IconSvg.jsx";

const Report = ({backer, user}) => {

    console.log(user);

    const handleSubmit = (e) => {
        e.preventDefault();
        const report = {
            id: backer.id,
            player_id: user.player_id,
        }
        console.log(report);
    }

    return (
        <form method="POST" onSubmit={handleSubmit}>
            <button className="result__edit" type="submit">
                <IconSvg width={16} height={16} id="danger_triangle"/> Репорт метки {backer.id}
            </button>
        </form>
    )
}

export default Report;