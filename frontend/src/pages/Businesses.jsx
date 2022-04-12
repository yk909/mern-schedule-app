import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getBusinesses, reset } from '../features/business/businessSlice';
import { BusinessCard } from '../components';

const Businesses = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { businesses, isLoading, isError, isSuccess, msg } = useSelector(state => state.business);

    useEffect(() => {
        if (!isError && !businesses && user) {
            dispatch(getBusinesses({
                id: id, 
                token: user.token
            }));
        }

        if (isError) {
            toast.error(msg);
            // dispatch(reset());
        }

        // return () => {
            // dispatch(reset());
        // }
    }, [id, businesses, isError, isSuccess, dispatch]);

    return (
        <>
            <BusinessCard
                businesses={businesses}
                isLoading={isLoading}
            />
        </>
    )
}

export default Businesses