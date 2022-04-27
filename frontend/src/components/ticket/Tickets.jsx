import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, CreateTicket, TicketTable } from "../";
import { getAllEmployeeTickets } from "../../features/ticket/ticketSlice";

const Tickets = () => {
    const [ isCardOpen, setIsCardOpen ] = useState(false);

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
                <CreateTicket/>
            </div>
            <TicketTable/>
        </Card>
    )
}

export default Tickets