import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalMessage, Card, UserShifts } from '../components';
import { getSenderGlobalMessage } from '../features/globalMessage/globalMessageSlice';
import { getManagerOpenShifts } from '../features/shift/shiftSlice';

const Dashboard = () => {
    const globalMessage = useSelector(state => state.globalMessage);
    const { userShifts, isLoading } = useSelector(state => state.shift);
    const { company } = useSelector(state => state.company);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSenderGlobalMessage());
        dispatch(getManagerOpenShifts());
    }, []);

    return (
        <main className="dashboard">
            {!globalMessage.isLoading && (
                <GlobalMessage />
            )}
            
            {!isLoading && userShifts && company && (
                <Card 
                    title="Open Shifts"
                    isOpen={true}
                >
                    <div className="user-open-shifts">
                        {userShifts && userShifts?.map(shift => (
                            <UserShifts
                                key={shift._id}
                                shift={shift}
                            />
                        ))}
                    </div>
                </Card>
            )}
        </main>
    )
}

export default Dashboard;