import { useState } from 'react';
import { Card } from '../';
import { MessageCard, CreateMessage } from '../';
import "./styles/GlobalMessage.css";

const GlobalMessage = () => {
    const [ isCardOpen, setIsCardOpen] = useState(false);

    return (
        <Card 
            title="Global Messages"
            isOpen={isCardOpen}
            setIsOpen={setIsCardOpen}
        >
            <div className="flex align-between px-1">
                <p className="title-2">
                    Your Messages
                </p>
                <CreateMessage/>
            </div>
            <MessageCard />
        </Card>
    )
}

export default GlobalMessage