import { useEffect } from 'react';
import './styles/Modal.css';

const Modal = ({children, bodyStyles, style, modalIsOpen, contentLabel, setModalIsOpen, actionBtnText, onSubmit, actionDangerBtnText, onSubmitDanger}) => {

    // useEffect(() => {
    //     document.body.style.overflow = modalIsOpen ? 'hidden' : 'auto';
    //     document.body.style.maxHeight = modalIsOpen ? '100vh' : 'unset';
    // }, [modalIsOpen]);

    const onClickOutside = (e) => {
        if (e.target.classList.contains('modal-overlay') || e.target.classList.contains('modal-wrapper')) {
            setModalIsOpen(false);
        }
    }

    return (
        <>
        {modalIsOpen ? (
        <div className="modal-overlay" onClick={onClickOutside} style={style}>
            <div className="modal-wrapper">
                <div className="modal-body">
                    <div className="modal-header">
                        <h3>{contentLabel}</h3>
                        <button className="btn-icon btn-icon-danger" onClick={() => {setModalIsOpen(false)} }>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <path d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                <path d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                            </svg>
                        </button>
                    </div>
                    <div className="modal-content" style={bodyStyles}>
                        {children}
                    </div>
                    <div className="modal-footer">
                        {actionDangerBtnText && (
                            <button className="btn btn-outline-danger" onClick={onSubmitDanger}>
                                {actionDangerBtnText}
                            </button>
                        )}
                        {actionBtnText && (
                            <button className="btn btn-outline-primary" onClick={onSubmit}>
                                {actionBtnText}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
        ) : null}
        </>
    )
}

export default Modal