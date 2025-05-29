import React from 'react';
import styles from './Modal.module.scss';
import {useModal} from '@app/providers';
import {clsx} from "clsx";
import IconSvg from "@shared/ui/IconSvg";

const Modal = ({name, children, contentClass, title}) => {
    const {active, stack, closeAll, closeModal} = useModal();

    const isOpen = active?.name === name;
    const isFirst = stack[0]?.name === name;
    const modal = stack.find(m => m.name === name);

    let modalTitle = typeof children === "function" && modal && modal.params?.title
        ? modal.params.title
        : title;

    const overlayClick = e => e.currentTarget === e.target && closeAll();

    return (
        <div
            className={`${styles.modal} 
            ${isOpen ? `${styles[`modal__visible`]}` : `${styles[`modal__hidden`]}`}
            ${isFirst ? `${styles[`modal__first`]}` : `${styles[`modal__secondary`]}`}
            `}
            onClick={overlayClick}
        >
            <div className={clsx(styles[`modal__content`], styles[contentClass])}>
                {modalTitle && (
                    <div className={styles["modal__header"]}>
                        {modalTitle}
                        <button className={styles["modal__btn"]} onClick={closeModal}>
                            <IconSvg width="36" height="36" id="close-menu"/>
                        </button>
                    </div>
                )}
                <div className={`${styles[`modal__body`]}`}>
                    {typeof children === "function"
                        ? modal
                            ? children(modal)
                            : null
                        : children}
                </div>
            </div>
        </div>
    );
};

export default Modal;