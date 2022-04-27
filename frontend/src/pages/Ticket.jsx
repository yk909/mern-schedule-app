import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getAllManagerTickets, getAllEmployeeTickets } from '../features/ticket/ticketSlice';
import { Card, TicketTable, CreateTicket } from '../components';

const Ticket = () => {
    const [isCardOpen, setIsCardOpen] = useState(false);
    const [isCard2Open, setIsCard2Open] = useState(true);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.split('/')[1] === 'dashboard') {
            dispatch(getAllManagerTickets());
        } else {
            dispatch(getAllEmployeeTickets());
        }
    }, [location.pathname]);

    return (
        <section>
            <Card
                title="Recieved Tickets"
                isOpen={isCardOpen}
                setIsOpen={setIsCardOpen}
            >
                <TicketTable
                    isReceived={true}
                />
            </Card>
            <Card
                title="Sent Tickets"
                isOpen={isCard2Open}
                setIsOpen={setIsCard2Open}
            >
                <div className="flex align-between px-1">
                    <p className="title-3">
                        Last 10 tickets
                    </p>
                    <CreateTicket
                        isReceived={false}
                    />
                </div>
                <TicketTable/>
            </Card>
        </section>
    )
}

export default Ticket