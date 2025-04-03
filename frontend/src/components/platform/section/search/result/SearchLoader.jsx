import React from 'react';
import loader from "../../../../../assets/video/loader.mp4";


const SearchLoader = () => {
    return (
        <div className="result__loader">
            <video autoPlay muted playsInline loop>
                <source src={loader} type="video/mp4"/>
            </video>
        </div>
    )
}

export default SearchLoader;