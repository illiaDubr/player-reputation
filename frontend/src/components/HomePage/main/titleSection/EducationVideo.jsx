import React from "react";
import video from "../../../../assets/video/homePage_video.mp4"
import Images from "../../../../assets/image/image.js";

const EducationVideo = () => {
    return (
            <div className="title__video-wrap">
                <video preload="auto" poster={Images.poster} autoPlay muted playsInline loop>
                    <source src={video} type="video/mp4"/>
                </video>
            </div>
    )
}

export default EducationVideo;