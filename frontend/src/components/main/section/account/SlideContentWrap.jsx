import React from "react";

const SlideContentWrap = ({children, title, hideTitle}) => {
    return (
        <>
            {!hideTitle && (
                <div className="slide__title">
                    {title}
                </div>
            )}
            <div className="slide__content">
                {children}
            </div>
        </>
    )
}

export default SlideContentWrap;