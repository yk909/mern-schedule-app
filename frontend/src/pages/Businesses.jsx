import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getBusinesses, reset } from '../features/business/businessSlice';
import { BusinessCard, CreateBusiness, CompanyCard } from '../components';

const Businesses = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { businesses, isLoading, isError, isSuccess, msg, isErrorEmployee } = useSelector(state => state.business);
    const { companies } = useSelector(state => state.company);

    useEffect(() => {
        if (id) {
            dispatch(getBusinesses(id));
        }
    }, [id]);

    useEffect(() => {
        if(isError) {
            toast.error(msg);
        }
    }, [isError]);

    return (
        <>
            {companies && (
                <CompanyCard 
                    isLoading={false}
                    companies={companies.filter(company => company._id === id)} 
                />
            )}
            <BusinessCard
                businesses={businesses}
                isLoading={isLoading}
            />
        </>
    )
}

export default Businesses