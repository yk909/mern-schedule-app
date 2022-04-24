import './styles/Card.css'

const Card = ({children, title, className, isOpen, setIsOpen}) => {
    return (
        <div className={`card ${className ? className : ''}`}>
            <div 
                className="card-title title-2"
                onClick={() => setIsOpen ? setIsOpen(!isOpen) : null}
            >
                {title}
            </div>
            <div className={`card-body ${isOpen ? 'open' : ''}`}>
                {children}
            </div>
        </div>
    )
}

export default Card