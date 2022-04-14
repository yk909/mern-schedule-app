import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getBusinesses } from '../features/business/businessSlice';
import { getEmployees } from '../features/employee/employeeSlice';
import { BusinessCard, CompanyCard } from '../components';

const Businesses = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const business = useSelector(state => state.business);
    const employee = useSelector(state => state.employee);
    const { companies } = useSelector(state => state.company);

    useEffect(() => {
        if (id) {
            dispatch(getBusinesses(id));
            dispatch(getEmployees(id));
        }
    }, [id]);

    useEffect(() => {
        if(business.msg) {
            toast.error(business.msg);
        }
    }, [business.msg]);

    useEffect(() => {
        if(employee.msg) {
            toast.error(employee.msg);
        }
    }, [employee.msg]);

    return (
        <>
            {companies && (
                <CompanyCard 
                    isLoading={false}
                    companies={companies.filter(company => company._id === id)} 
                />
            )}
            <BusinessCard
                businesses={business.businesses}
                isLoading={business.isLoading}
            />
        </>
    )
}

export default Businesses