import React from 'react';
import styles from './RoleInfoSection.module.scss';

const RoleInfoSection = () => {
    return (
        <div className={`${styles[`info__wrap`]}`}>
            <h2 className={`${styles[`info__title`]}`}>
                Возможности <br/>
                Player Reputation
            </h2>
        </div>
    )
}

export default RoleInfoSection;