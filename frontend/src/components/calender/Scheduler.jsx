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
        if(id, toDate, fromDate) {
            const data = {
                business: id,
                fromDate: `${fromDate.getFullYear()}-${fromDate.getMonth()}-${fromDate.getDate()}`,
                toDate: `${toDate.getFullYear()}-${toDate.getMonth()}-${toDate.getDate()}`,
            }
            dispatch(getAllBusinessShifts(data));
        }
    }, [id]);

    useEffect(() => {
        if(isError) {
            toast.error(msg);
        }
    }, [isError]);


    const onWheel = (e) => {
        // scroll left on wheel up and right on wheel down only if not on mobile view
        // if (window.innerWidth > 768) {
        //     if (e.deltaY > 0) {
        //         calenderRef.current.scrollLeft += 100;
        //     } else {
        //         calenderRef.current.scrollLeft -= 100;
        //     }
        // }
    };

    return (
        <div className={`calender-body${
            dateControl.value === 'day' ? 
                ' calender-body-day'
            : ''}`}>
            <div
                ref={calenderRef}
                onWheel={onWheel}
                className="scheduler-wrapper"
            >
                <CalenderHeader
                    fromDate={fromDate}
                    dateControl={dateControl}
                    setStartDate={setStartDate}
                    setDateControl={setDateControl}
                />
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
                        dateControl={dateControl}
                    />
                </div>
            </div>
        </div>
    )
}

export default Scheduler;