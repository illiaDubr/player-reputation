import React from "react";
import styles from "./SlideWarning.module.scss"
import IconSvg from "@shared/ui/IconSvg/index.js";

const SlideWarning = ({children}) => {
    return (
        <div className={styles[`slide__warning`]}>
            <IconSvg width={24} height={24} id="red_notification"/>
            <p>
                {children}
            </p>
        </div>
    )
}

export default SlideWarning;