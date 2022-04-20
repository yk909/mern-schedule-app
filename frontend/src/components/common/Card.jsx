import './styles/Card.css'

const Card = ({children, title, className, isOpen, setIsOpen}) => {
    return (
        <div className={`card ${className ? className : ''}`}>
            <div 
                className="card-title"
                onClick={() => setIsOpen(!isOpen)}
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