import { useEffect, useRef } from 'react';
import { CalenderHeader, OpenShift, UserShift, CalenderFooter } from '../';
import './styles/Scheduler.css';

const Scheduler = ({fromDate, dateControl, setStartDate, setDateControl}) => {
    const calenderRef = useRef(null);
    const date = fromDate;

    const onWheel = (e) => {
        // scroll left on wheel up and right on wheel down only if not on mobile view
        if (window.innerWidth > 768) {
            if (e.deltaY > 0) {
                calenderRef.current.scrollLeft += 100;
            } else {
                calenderRef.current.scrollLeft -= 100;
            }
        }
    };

    const onMouseDownResize = (e) => {
        e.preventDefault();
        const parentRef = e.target.parentElement.parentElement;
        const minStep = 70; // min box width
        const maxWidth = parentRef.parentElement.parentElement.clientWidth; // container width


        const onMouseMove = (e) => {
            let newWidth = e.pageX + 15 - parentRef.getBoundingClientRect().left; // 15 is an offset to make the width of the div to be the same as the width of the mouse pointer
            if ( newWidth >= minStep && newWidth < maxWidth + 50 - parentRef.offsetLeft ) {
                parentRef.style.width = (+(Math.round(100*(newWidth / minStep) * 10) / 100).toFixed(0) * 10) + "%";
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
                    />

                    {[...Array(5).keys()].map((e) => {
                    return (
                        <UserShift
                            e={e}
                            dateControl={dateControl}
                            onMouseDownResize={onMouseDownResize}
                        />
                        )
                    })}

                    <CalenderFooter
                        dateControl={dateControl}
                    />
                </div>
            </div>
        </div>
    )
}

export default Scheduler;