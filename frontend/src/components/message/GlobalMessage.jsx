import { useSelector } from 'react-redux';
import { Card } from '../';
import "./styles/GlobalMessage.css";

const GlobalMessage = () => {
  const { globalMessageSender } = useSelector(state => state.globalMessage);
  return (
    <Card 
        title="Global Messages"
        isOpen={true}
    >
        <div className="flex align-between px-1">
            <p className="title-2">
                Your Messages
            </p>
            <div className="btn btn-primary">
                Create Message
            </div>
        </div>
        {globalMessageSender?.map(message => (
            <GlobalMessage
                key={message._id}
                message={message}
            />
        ))}
    </Card>
  )
}

export default GlobalMessage