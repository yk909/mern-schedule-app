import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Alerts = () => {
    const auth = useSelector(state => state.auth);
    const company = useSelector(state => state.company);
    const business = useSelector(state => state.business);
    const employee = useSelector(state => state.employee);
    const shift = useSelector(state => state.shift);
    const invite = useSelector(state => state.invite);
    const globalMessage = useSelector(state => state.globalMessage);

    useEffect(() => {
        if(auth.isError) {
            toast.error(auth.msg);
        }
        if(company.isError) {
            // toast.error(company.msg);
        }
        if(business.isError) {
            toast.error(business.msg);
        }
        if(employee.isError) {
            toast.error(employee.msg);
        }
        if(shift.isError) {
            toast.error(shift.msg);
        }
        if(invite.isError) {
            toast.error(invite.msg);
        }
        if(globalMessage.isError) {
            toast.error(globalMessage.msg);
        }
    }, [
        auth.isError, 
        company.isError, 
        business.isError, 
        employee.isError, 
        shift.isError, 
        invite.isError, 
        globalMessage.isError
    ]);

    return null;
}

export default Alerts