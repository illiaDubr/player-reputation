import React from "react";
import video from "./assets/video/homePage_video.mp4"
import poster from "./assets/image/poster.webp"
import styles from './EducationVideo.module.scss';

const EducationVideo = () => {
    return (
        <div className={`${styles[`title__video-wrap`]}`}>
            <video preload="auto" poster={poster} autoPlay muted playsInline loop>
                <source src={video} type="video/mp4"/>
            </video>
        </div>
    )
}

export default EducationVideo;