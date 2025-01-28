import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

const ModalContext = createContext(undefined);

export const ModalProvider = ({ children }) => {
    const [modalStack, setModalStack] = useState([]);

    const openModal = useCallback((modalName) => {
        setModalStack((prevStack) => [...prevStack, modalName]);
    }, []);

    const closeModal = useCallback(() => {
        setModalStack((prevStack) => prevStack.slice(0, -1));
    }, []);

    const closeAllModals = useCallback(() => {
        setModalStack([]);
    }, []);

    const goBack = useCallback(() => {
        setModalStack((prevStack) => (prevStack.length > 1 ? prevStack.slice(0, -1) : []));
    }, []);

    const activeModal = modalStack[modalStack.length - 1];

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") closeAllModals();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [closeAllModals]);

    return (
        <ModalContext.Provider value={{ activeModal, openModal, closeModal, closeAllModals, goBack, modalStack }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);

export const Modal = ({ modalName, children }) => {
    const { activeModal, closeAllModals, modalStack } = useModal();

    const isFirstModal = modalStack[0] === modalName;

    const isOpen = activeModal === modalName;

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("modal")) closeAllModals();
    };

    return (
        <div
            className={`modal ${isOpen ? "modal--visible" : "modal--hidden"} ${isFirstModal ? "modal--first" : "modal--secondary"}`}
            onMouseUp={handleOverlayClick}
        >
            <div className="modal-content">{children}</div>
        </div>
    );
};