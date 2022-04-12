import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCompany, reset } from "../../features/company/companySlice";

const RequireCompany = ({children}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { company, isLoading, isError, isSuccess, msg } = useSelector((state) => state.company);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {

        if(user && !company) {
            dispatch(getCompany(user.token));
        }

        if (isError) {
            toast.error(msg);
        }

        if(company && company.length === 0) {
            navigate("/find-company");
        }

    }, [company, isError, msg, isSuccess, navigate, dispatch]);

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    return children;

}

export default RequireCompany