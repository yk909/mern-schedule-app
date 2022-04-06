import { useEffect, useRef } from 'react';
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

    const onMouseDownResize = (e, index) => {
        e.preventDefault();
        const parentRef = e.target.parentElement.parentElement;
        const minStep = 70; // min box width

        const onMouseMove = (e) => {
            let newWidth = e.pageX + 15 - parentRef.getBoundingClientRect().left; // 15 is an offset to make the width of the div to be the same as the width of the mouse pointer
            console.log(index)
            if ( newWidth >= minStep && newWidth <= (24-index)*70 ) { // 25 is the number of boxes in a row, 70 is the width of a box, index is current box index
                parentRef.style.width = (Math.round(100*(newWidth / minStep) * 10) / 100).toFixed(0) * 10 + "%";
            }
        };

        const onMouseUp = () => {
            window.removeEventListener("mousemove", onMouseMove);
        };

        if (parentRef) {
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onMouseUp);
        }
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
                        onMouseDownResize={onMouseDownResize}
                        startDate={startDate}
                    />

                    <UserShift
                        date={date}
                        dateControl={dateControl}
                        onMouseDownResize={onMouseDownResize}
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