import { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllBusinessShifts } from '../../features/shift/shiftSlice';
import { CalenderHeader, OpenShift, UserShift, CalenderFooter } from '../';
import './styles/Scheduler.css';

const Scheduler = ({fromDate, toDate, startDate, dateControl, setStartDate, setDateControl}) => {
    const calenderRef = useRef(null);
    const { id } = useParams();
    const dispatch = useDispatch();
    const { shifts, employees, isLoading, isError, msg } = useSelector(state => state.shift);


    useEffect(() => {
        if(id && toDate && fromDate) {
            const data = {
                business: id,
                fromDate: `${fromDate.getFullYear()}-${fromDate.getMonth()}-${fromDate.getDate()}`,
                toDate: `${toDate.getFullYear()}-${toDate.getMonth()}-${toDate.getDate()}`,
            }
            dispatch(getAllBusinessShifts(data));
        }
    }, [startDate]);

    return (
        <>
        {!isLoading && fromDate ? (
        <div className={`calender-body${
            dateControl.value === 'day' ? 
                ' calender-body-day'
            : ''}`}>
            <div
                ref={calenderRef}
                className="scheduler-wrapper"
            >
                {fromDate && (
                <CalenderHeader
                    fromDate={fromDate}
                    dateControl={dateControl}
                    setStartDate={setStartDate}
                    setDateControl={setDateControl}
                />
                )}
                <div className="section-container">
                    <OpenShift
                        startDate={startDate}
                        toDate={toDate}
                        fromDate={fromDate}
                        dateControl={dateControl}
                        shifts={shifts}
                    />
                    <UserShift
                        startDate={startDate}
                        toDate={toDate}
                        fromDate={fromDate}
                        dateControl={dateControl}
                        employees={employees}
                        shifts={shifts}
                    />
                    <CalenderFooter
                        startDate={startDate}
                        toDate={toDate}
                        fromDate={fromDate}
                        dateControl={dateControl}
                    />
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