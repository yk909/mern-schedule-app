import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { createTicket } from "../../features/ticket/ticketSlice";

const CreateTicket = () => {
    return (
        <>
            <div className="btn btn-primary">
                Create Ticket
            </div>
        </>
    )
}

export default CreateTicket