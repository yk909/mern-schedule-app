import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCompany, reset } from "../../features/company/companySlice";

const RequireCompany = ({children}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { companies, isLoading, isError, isSuccess, msg } = useSelector((state) => state.company);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {

        if(user && !companies) {
            dispatch(getCompany(user.token));
        }

        if (isError) {
            toast.error(msg);
        }

        if(companies && companies.length === 0) {
            navigate("/find-company");
        }

    }, [companies, isError, msg, isSuccess, navigate, dispatch]);

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    return children;

}

export default RequireCompany