import { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllBusinessShifts } from '../../features/shift/shiftSlice';
import { CalenderHeader, OpenShift, UserShift, CalenderFooter, AcceptedShift } from '../';
import './styles/Scheduler.css';

const Scheduler = () => {
    const calenderRef = useRef(null);
    const dispatch = useDispatch();
    const { id } = useParams();
    const { isLoading } = useSelector(state => state.shift);
    
    const startDate = new Date(useSelector(state => state.local.time.startDate));
    const fromDate = useSelector(state => state.local.time.fromDate);
    const toDate = useSelector(state => state.local.time.toDate);
    const dateControl = useSelector(state => state.local.time.dateControl);

    useEffect(() => {
        if (id && fromDate && toDate) {
            const  data = {
                business: id,
                fromDate: dateControl === 'day' 
                    ? new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
                        : fromDate,
                toDate: dateControl === 'day' 
                    ? new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+1)
                        : toDate,
            }
            dispatch(getAllBusinessShifts(data));
        }
    }, [toDate])

    return (
        <>
        {!isLoading && fromDate && toDate && id ? (
        <div className={`calender-body${
            dateControl === 'day' ? 
                ' calender-body-day'
            : ''}`}>
            <div
                ref={calenderRef}
                className="scheduler-wrapper"
            >
                {fromDate && (
                    <CalenderHeader />
                )}
                <div className="section-container">
                    <OpenShift />
                    <AcceptedShift />
                    <UserShift />
                    <CalenderFooter />
                </div>
            </div>
        </div>
        ) : (
            <div className="calender-body blink">
            </div>
        )}
        </>
    )
}

export default Scheduler;