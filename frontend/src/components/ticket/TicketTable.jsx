import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const TicketTable = ({isReceived}) => {
    const ticketsFrom = useSelector(state => state.ticket.from);
    const ticketsTo = useSelector(state => state.ticket.to);
    const location = useLocation().pathname.split('/')[1];

    const tickets = isReceived ? ticketsTo : ticketsFrom;

    return (
    <div className="table mt-1">
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    {isReceived ? (
                        <th>From</th>
                    ) : (
                        <th>To</th>
                    )}
                    <th className="w-100 text-start">Message</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {tickets?.map((ticket, index) => {
                    return (
                        <tr key={index}>
                            <td><b>{index+1}</b></td>
                            {isReceived ? (
                                <td>
                                    <b>
                                        {ticket.from.firstName} {ticket.from.lastName}
                                    </b>
                                </td>
                            ) : (
                                <td>
                                    <b>
                                    {ticket.to ? (
                                        `${ticket.to.firstName} ${ticket.to.lastName}`
                                    ) : (
                                        `${ticket.business.name}`
                                    )}
                                    </b>
                                </td>
                            )}
                            <td className="w-100 text-start">
                                {ticket.message}
                            </td>
                            <td>
                                <b>
                                    {ticket?.type}
                                </b>
                            </td>
                            <td>
                                {ticket?.date.split('T')[0]}
                            </td>
                            <td className={`${
                                ticket.status === 'pending' ? 'bg-warning' 
                            : ticket.status === 'accepted' ? 'bg-success'
                            : ticket.status === 'rejected' ? 'bg-danger' : '' }`}>
                                {ticket.status}
                            </td>
                            {isReceived ? (
                                <td className="flex space-between">
                                    <button
                                        className="btn btn-outline-danger w-100 btn-sm mr-1"
                                        onClick={() => 
                                            {
                                                console.log('message')
                                                // dispatch(deleteGlobalMessage(message._id));
                                            }
                                        }>
                                        Reject
                                    </button>
                                    <button
                                        className="btn btn-outline-success w-100 btn-sm"
                                        onClick={() => 
                                            {
                                                console.log('message')
                                                // dispatch(deleteGlobalMessage(message._id));
                                            }
                                        }>
                                        Approve
                                    </button>
                                </td>
                            ) : (
                            <td>
                                <button
                                    className="btn btn-outline-danger w-100 btn-sm"
                                    onClick={() => 
                                        {
                                            console.log('message')
                                            // dispatch(deleteGlobalMessage(message._id));
                                        }
                                    }>
                                    Delete
                                </button>
                            </td>
                            )}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
    )
}

export default TicketTable