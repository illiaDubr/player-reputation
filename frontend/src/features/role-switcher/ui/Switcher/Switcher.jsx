import React, { useContext } from 'react';
import { RoleContext } from '@features/role-switcher/model';
import styles from './Switcher.module.scss';

const Switcher = ({ text, variant = 'default' }) => {
    const { selectedRole, setSelectedRole } = useContext(RoleContext);

    const variantClass = variant !== 'default' ? styles[`info__switch-wrap--${variant}`] : '';

    return (
        <div className={`${styles['info__switch-wrap']} ${variantClass}`}>
            {text && <p className="title__gradient">Выберите свою роль</p>}

            <div className={`${styles['info__switch-box']}`}>
                <button
                    className={`${styles['info__switch']} ${selectedRole === 'backer' ? styles.active : ''}`}
                    onClick={() => setSelectedRole('backer')}
                >
                    Я бэкер
                </button>

                <button
                    className={`${styles['info__switch']} ${selectedRole === 'player' ? styles.active : ''}`}
                    onClick={() => setSelectedRole('player')}
                >
                    Я игрок
                </button>
            </div>
        </div>
    );
};

export default Switcher;