import React from "react";
import {useFitText} from "./useFitText.jsx";

const Notification = ({value}) => {
    const notificationRef = useFitText(24);

    return (
        <span className="notification" ref={notificationRef}>
            {value}
        </span>
    )
}

export default Notification;