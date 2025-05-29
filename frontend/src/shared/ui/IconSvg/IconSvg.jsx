import React from 'react';
import sprite from '../../assets/icons/sprite.svg'
import fundsSprite from '@features/search/player-search/ui/SearchResult/ui/ResultItemList/assets/fundsSprite.svg'

const IconSvg = ({id, width, height, variant}) => {
    const iconSprite = variant === 'funds' ? fundsSprite : sprite;

    return (
        <svg width={width} height={height} className="svg">
            <use xlinkHref={`${iconSprite}#${id}`} />
        </svg>
    )
}

export default IconSvg;