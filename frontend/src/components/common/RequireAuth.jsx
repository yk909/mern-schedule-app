import { useEffect } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

const RequireAuth = ({children}) => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
        
        if(user && !user.companies) {
            navigate("/find-company");
        }

    }, [user, navigate]);

    return children;

}

export default RequireAuth