import './styles/Card.css'

const Card = ({children, title, className, isOpen, setIsOpen}) => {
    return (
        <div className={`card ${className ? className : ''} ${isOpen ? 'open' : ''}`}>
            <div 
                className="card-title flex align-between"
                onClick={() => setIsOpen ? setIsOpen(!isOpen) : null}
            >
                <h3 className="title-2">
                    {title}
                </h3>
                <div className="open-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                        <path d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                </div>
            </div>
            <div className="card-body">
                {children}
            </div>
        </div>
    )
}

export default Card