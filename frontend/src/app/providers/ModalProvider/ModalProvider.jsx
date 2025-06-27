import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';

const ModalContext = createContext(undefined);

export const ModalProvider = ({ children }) => {
    const [stack, setStack] = useState([]);

    const openModal = useCallback((name, params = {}) => {
        setStack(s => [...s, { name, params }]);
    }, []);

    const closeModal   = useCallback(() => setStack(s => s.slice(0, -1)), []);
    const closeAll     = useCallback(() => setStack([]), []);
    const goBack       = useCallback(() => setStack(s => (s.length > 1 ? s.slice(0, -1) : [])), []);

    const active = stack[stack.length - 1];

    useEffect(() => {
        const esc = e => e.key === 'Escape' && closeAll();
        window.addEventListener('keydown', esc);
        return () => window.removeEventListener('keydown', esc);
    }, [closeAll]);

    return (
        <ModalContext.Provider value={{ active, stack, openModal, closeModal, closeAll, goBack }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);