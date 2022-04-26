import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateGlobalMessage } from '../../features/globalMessage/globalMessageSlice';
import './styles/MessageCard.css';

const MessageCard = ({message}) => {
    const [ isOpen, setIsOpen ] = useState(false);
    const dispatch = useDispatch();

    return (
        <div className="message-card">
            <div className="message-card-header title-4 flex align-between">
                <p>{message.receiver}</p>
                <p>{new Date(message.createdAt).toLocaleString("en-US", { month: 'short', weekday: "short", day: 'numeric'})}</p>
            </div>
            <div className="message-card-body">
                <div className="message ml-1">
                    {message.message}
                </div>
            </div>
            {message.shift && (
                <div className="message-card-footer">
                    <div 
                        className="message-card-footer-title flex align-between"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <p>Shift</p>
                        <div className={`open-icon ${isOpen ? 'open' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                <path d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                            </svg>
                        </div>
                    </div>
                    {isOpen && (
                        <div className="message-card-footer-body text-headline">
                            <div className="flex align-between">
                                <b>
                                    {message.shift.business.name}
                                </b>
                                <p className="text-center">
                                    {new Date(message.shift.date).toLocaleString("en-US", { month: 'short'})}
                                    <br />
                                    {new Date(message.shift.date).toLocaleString("en-US", { weekday: 'short', day: 'numeric' })}
                                </p>
                            </div>
                            <div className="flex align-between mt-1">
                                <p>
                                    {message.shift.startTime} - {message.shift.endTime}
                                </p>
                                <div 
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={() => dispatch(updateGlobalMessage({_id: message._id}))}
                                >
                                    Accept
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default MessageCard