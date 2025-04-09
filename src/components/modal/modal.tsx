import styles from './modal.module.css';
import React, { useCallback, useEffect, FC } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay/modal-overlay.js';
import {createPortal} from 'react-dom';

type TProps={
    title: string; 
    onClose: (e?: Event) => void; 
    children: React.ReactNode;
}
const Modal : FC<TProps> =({ title, onClose, children }) =>{
    const checkEsc = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") {
            onClose(e);
        }
    }, [onClose]);

    useEffect(() => {
        document.addEventListener("keydown", checkEsc, false);

        return () => {
            document.removeEventListener("keydown", checkEsc, false);
        };
    }, [checkEsc]);

    return createPortal(
        <div className={styles.container}>
            <div className={styles.dialog}>
                <div className={`${styles.header} ml-10 mt-10 mr-10`}>
                    <span className={`${styles.caption} text text_type_main-large`}>{title}</span>
                    <span className={styles['close-btn']}><CloseIcon type="primary" onClick={onClose} /></span>
                </div>
                {children}
              
            </div>
            <ModalOverlay onClose={onClose} />
        </div>
    , document.getElementById('modals') as Element);
}


export default Modal;