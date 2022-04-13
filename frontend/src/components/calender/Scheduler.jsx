import { useRef } from 'react';
import { CalenderHeader, OpenShift, UserShift, CalenderFooter } from '../';
import './styles/Scheduler.css';

const Scheduler = ({fromDate, startDate, dateControl, setStartDate, setDateControl}) => {
    const calenderRef = useRef(null);
    const date = fromDate;

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
                    date={date}
                    dateControl={dateControl}
                    setStartDate={setStartDate}
                    setDateControl={setDateControl}
                />
                <div className="section-container">
                    <OpenShift
                        date={date}
                        dateControl={dateControl}
                        startDate={startDate}
                    />

                    <UserShift
                        date={date}
                        dateControl={dateControl}
                        startDate={startDate}
                    />
                    <CalenderFooter
                        dateControl={dateControl}
                    />
                </div>
            </div>
        </div>
    )
}

export default Scheduler;