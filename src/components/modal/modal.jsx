import styles from './modal.module.css';
import { useCallback, useEffect } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay/modal-overlay.jsx';
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';


function Modal({ title, onClose, children }) {
    const checkEsc = useCallback(e => {
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
    , document.getElementById('modals'));
}

Modal.propTypes = {
    title: PropTypes.string, 
    onClose: PropTypes.func.isRequired, 
    children: PropTypes.element
}
export default Modal;