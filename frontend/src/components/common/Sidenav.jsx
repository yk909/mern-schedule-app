import { useState, useEffect } from 'react';
import './styles/Sidenav.css';

const Sidenav = ({children, title, isSidenavOpen, setIsSidenavOpen}) => {
    const [isOpen, setIsOpen] = useState(false);

    const onClickOutside = (e) => {
        if (e.target.classList.contains('sidenav-wrapper')) {
            setIsSidenavOpen(false);
        }
    }

    useEffect(() => {
        if (!isSidenavOpen) {
            setTimeout(() => {
                setIsOpen(false);
            }, 300);
        } else {
            setIsOpen(true);
        }
    }, [isSidenavOpen]);

    return (
        isOpen ? (
        <div 
            className={`sidenav-wrapper ${isSidenavOpen ? 'open' : 'closed'}`}
            onClick={onClickOutside}
        >
            <div className="sidenav">
                <div className="sidenav-header">
                    <div className="flex align-between">
                        <h3 className="title-3">
                            {title}
                        </h3>
                        <button className="btn-icon btn-icon-danger" onClick={() => {setIsSidenavOpen(false)} }>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <path d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                <path d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="sidenav-body">
                    {children}
                </div>
            </div>
        </div>
        ) : null
    )
}

export default Sidenav