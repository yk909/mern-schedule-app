import { useEffect } from 'react';
import './styles/Modal.css';

const Modal = ({children, isOpen, contentLabel, setModalIsOpen}) => {

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
        document.body.style.maxHeight = isOpen ? '100vh' : 'unset';
    }, [isOpen]);

    const onClickOutside = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            setModalIsOpen(false);
        }
    }

    return (
        <>
        {isOpen ? (
        <div className="modal-overlay" onClick={onClickOutside}>
            <div className="modal-wrapper">
                <div className="modal-body">
                    <div className="modal-header">
                        <h3>{contentLabel}</h3>
                        <button className="btn-icon" onClick={() => {setModalIsOpen(false)} }>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <path d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                <path d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                            </svg>
                        </button>
                    </div>
                    <div className="modal-content">
                        {children}
                    </div>
                </div>
            </div>
        </div>
        ) : null}
        </>
    )
}

export default Modal