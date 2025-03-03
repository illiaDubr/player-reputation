import React from 'react';
import sprite from '~/assets/image/icon/sprite.svg';
import fundsSprite from '~/assets/image/icon/fundsSprite.svg';

const IconSvg = ({id, width, height, variant}) => {
    const iconSprite = variant === 'funds' ? fundsSprite : sprite;

    return (
        <svg width={width} height={height} className="svg">
            <use href={`${iconSprite}#${id}`} />
        </svg>
    )
}

export default IconSvg;