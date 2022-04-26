import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MessageCard, Sidenav } from '../';

const Notification = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { globalMessages } = useSelector(state => state.globalMessage);

    return (
        <>
            <Sidenav
                setIsSidebarOpen={setIsSidebarOpen}
                isSidebarOpen={isSidebarOpen}
                title={`Notifications`}
            >
                <div>
                    {globalMessages && (globalMessages.companyGlobalMessage.length === 0 && globalMessages.businessGlobalMessage.length === 0) ? (
                        <p>
                            You have no notifications
                        </p>
                    ) : globalMessages && (
                        <div>
                            {globalMessages.companyGlobalMessage?.map(message => (
                                <MessageCard key={message._id} message={message}/>
                            ))}
                            {globalMessages.businessGlobalMessage?.map(message => (
                                <MessageCard key={message._id} message={message}/>
                            ))}
                        </div>
                    )}
                </div>
            </Sidenav>
            <li className="notification" onClick={() => setIsSidebarOpen(true)}>
                <a className="flex align-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                    </svg>
                    {globalMessages && (globalMessages.companyGlobalMessage.length !== 0 || globalMessages.businessGlobalMessage.length !== 0) && (
                        <div className="count">
                            {+globalMessages?.companyGlobalMessage?.length + +globalMessages?.businessGlobalMessage?.length}
                        </div>
                    )}
                    <span>
                        Notifications
                    </span>
                </a>
            </li>
        </>
    )
}

export default Notification