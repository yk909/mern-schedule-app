import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TicketTable = () => {
    const tickets = useSelector(state => state.ticket.tickets);

    return (
    <div className="table mt-1">
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>From</th>
                    <th>To</th>
                    <th className="w-100 text-start">Message</th>
                    <th>Business</th>
                    <th>Type</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {tickets?.map((ticket, index) => {
                    return (
                        <tr key={index}>
                            <td><b>{index+1}</b></td>
                            <td>
                                {ticket.from}
                            </td>
                            <td>
                                {ticket.to}
                            </td>
                            <td className="w-100">
                                {ticket.message}
                            </td>
                            <td>
                                <Link to={`/scheduler/${ticket.business}`} className="text-hover">
                                    Business
                                </Link>
                            </td>
                            <td>
                                {ticket.type}
                            </td>
                            <td>
                                {ticket.status}
                            </td>
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
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
    )
}

export default TicketTable