import React from "react";

const BackersList = ({data}) => {
    return (
        <>
            {data.map((item, index) => (
                <div className="admin__box" key={index}></div>
            ))}
        </>
    )
}

export default BackersList;