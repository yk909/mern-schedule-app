import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getBusinesses } from '../features/business/businessSlice';
import { getEmployees } from '../features/employee/employeeSlice';
import { BusinessCard, CompanyCard, CreateCompany } from '../components';

const Businesses = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const employee = useSelector(state => state.employee);
    const { companies, isLoading } = useSelector(state => state.company);
    const business = useSelector(state => state.business);

    useEffect(() => {
        if (companies && companies.length != 0) {
            dispatch(getBusinesses(companies[0]._id));
            dispatch(getEmployees(companies[0]._id));
        }
    }, [companies]);

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
                <>
                <CompanyCard 
                    isLoading={isLoading}
                    companies={companies} 
                />
                <BusinessCard
                    businesses={business.businesses}
                    isLoading={business.isLoading}
                />
                </>
            )}
            {!isLoading && companies && companies.length === 0 && (
                <CreateCompany />
            )}
        </>
    )
}

export default Businesses