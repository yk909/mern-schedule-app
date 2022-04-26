import { useState, useEffect } from 'react';
import './styles/Sidebar.css';

const Sidenav = ({children, title, isSidebarOpen, setIsSidebarOpen}) => {
    const [isOpen, setIsOpen] = useState(false);

    const onClickOutside = (e) => {
        if (e.target.classList.contains('sidebar-wrapper')) {
            setIsSidebarOpen(false);
        }
    }

    useEffect(() => {
        if (!isSidebarOpen) {
            setTimeout(() => {
                setIsOpen(false);
            }, 300);
        } else {
            setIsOpen(true);
        }
    }, [isSidebarOpen]);

    return (
        isOpen ? (
        <div 
            className={`sidebar-wrapper ${isSidebarOpen ? 'open' : 'closed'}`}
            onClick={onClickOutside}
        >
            <div className="sidebar">
                <div className="sidebar-header">
                    <div className="flex align-between">
                        <h3 className="title-3">
                            {title}
                        </h3>
                        <button className="btn-icon btn-icon-danger" onClick={() => {setIsSidebarOpen(false)} }>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <path d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                <path d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="sidebar-body">
                    {children}
                </div>
            </div>
        </div>
        ) : null
    )
}

export default Sidenav