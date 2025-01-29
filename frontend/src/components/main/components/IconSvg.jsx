import React from 'react';
import sprite from '~/assets/image/icon/sprite.svg';

const IconSvg = ({id, width, height}) => {
    return (
        <svg width={width} height={height} className="svg">
            <use href={`${sprite}#${id}`}/>
        </svg>
    )
}

export default IconSvg;