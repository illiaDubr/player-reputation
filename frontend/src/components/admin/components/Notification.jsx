import React from "react";
import {useFitText} from "./useFitText.jsx";

const Notification = ({value}) => {
    const notificationRef = useFitText(24);

    return (
        <div className="notification" ref={notificationRef}>
            {value}
        </div>
    )
}

export default Notification;