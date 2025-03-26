import React from "react";
import {useFitText} from "./useFitText.jsx";

const Notification = ({value, fontSize}) => {
    const notificationRef = useFitText(fontSize);

    return (
        <div className="notification" ref={notificationRef}>
            {value}
        </div>
    )
}

export default Notification;