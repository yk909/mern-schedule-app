import { arrowTopIcon } from '../../constance/icons'
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
                    {arrowTopIcon}
                </div>
            </div>
            <div className="card-body">
                {children}
            </div>
        </div>
    )
}

export default Card