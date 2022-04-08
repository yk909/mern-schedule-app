import { useEffect, useRef, useState } from 'react';
import { hours } from '../../constance/dummyData';


const DayShift = ({ dateControl, startDate, date, shifts }) => {

    const shiftParentRef = useRef(null);
    const [endTime, setEndTime] = useState({});

    const onMouseDownResize = (e, index, startTime) => {
        e.preventDefault();
        const minStep = 70; // min box width

        const onMouseMove = (e) => {
            let newWidth = e.pageX + 15 - shiftParentRef.current.getBoundingClientRect().left; // 15 is an offset to make the width of the div to be the same as the width of the mouse pointer
            let withPercent = +(Math.round(1000*(newWidth / minStep)) / 100).toFixed(0)
            const startTimeNum = +startTime.slice(0, 2);

            if ( newWidth >= minStep && newWidth <= (24-index)*70 ) { // 25 is the number of boxes in a row, 70 is the width of a box, index is current box index
                let minutes = ((withPercent/10 % 1).toFixed(1) * 60);
                let hour = (startTimeNum + Math.floor(withPercent/10) > 12 ? startTimeNum + Math.floor(withPercent/10) : +startTimeNum + Math.floor(withPercent/10))
                let toAMPM = hour > 12 ? hour - 12 : hour;
                let newEndTime =  (toAMPM < 10 ? "0" + toAMPM : toAMPM) + ":"+ 
                    (minutes < 10 ? "0"+minutes : minutes) + (hour >= 12 ? "PM" : "AM");

                setEndTime({...endTime, [index]: newEndTime});

                shiftParentRef.current.style.width = withPercent * 10 + "%";
            }
        };

        const onMouseUp = () => {
            window.removeEventListener("mousemove", onMouseMove);
        };

        if (shiftParentRef.current) {
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onMouseUp);
        }
    };

    const calcTotalHours = ( startTime, endTime ) => {
        const hours = startTime.includes("PM") && +startTime.slice(0, 2) != "12" ? ((+startTime.slice(0, 2)) + 12) : (+startTime.slice(0, 2));
        const minutes = endTime.includes("PM") && +endTime.slice(0, 2) != "12" ? ((+endTime.slice(0, 2)) + 12) : (+endTime.slice(0, 2));
        const timeStart = new Date().setHours(hours, startTime.slice(3,5));
        const timeEnd = new Date().setHours(minutes, endTime.slice(3,5));

        // return time difference in hours, minutes
        const result = ((timeEnd - timeStart) / (1000 * 60 * 60)).toFixed(2) % 1 * 60;
        return Math.trunc((timeEnd - timeStart) / (1000 * 60 * 60)) + 'h ' + (Math.round(result) != 0 ? (Math.round(result) + 'm') : '');

    };

    return (
        <>
        { shifts?.map((shift, e) => {
            return (
                hours.includes(shift.startTime.slice(0,2) + shift.startTime.slice(5)) &&
                shift.date === `${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()}` &&
                <div key={`shift-row-${e}`} className="flex">
                    { hours.map((time, index) => { // loop for each day
                        return (
                            <div 
                                key={`shift-day-${time}`}
                                id={ `${time}` }
                                className="col section-holder"
                            >
                                <div className="flex flex-col">
                                    {time === shift.startTime.slice(0,2) + shift.startTime.slice(5) &&
                                    shift.date === `${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()}` &&
                                        <div 
                                            className="shift-parent flex align-between"
                                            ref={shiftParentRef}
                                            style={{
                                                width: `${100*(
                                                    +(hours.indexOf(shift.endTime.slice(0,2) + shift.endTime.slice(5))) - hours.indexOf(shift.startTime.slice(0,2) + shift.startTime.slice(5))
                                                    )}%`
                                            }}
                                        >
                                            <div className={`shift w-100 h-100 ${ shift.color }`}>
                                                <div 
                                                    onMouseDown={(e) => {onMouseDownResize(e, index, shift.startTime)}}
                                                    className="stretch"
                                                ></div>
                                                <div className="time flex align-between w-100 h-100">
                                                    <div className="clock-time">
                                                        { shift.startTime }
                                                        <hr />
                                                        { 
                                                            endTime[index] ?
                                                                endTime[index]
                                                            :
                                                                shift.endTime 
                                                        }
                                                    </div>
                                                    <div className="flex align-center">
                                                        <div className="total-hours">
                                                            { calcTotalHours(shift.startTime, endTime[index] ? endTime[index] : shift.endTime) }
                                                            {/* { (hours.indexOf(shift.endTime.slice(0,2) + shift.endTime.slice(5))) - hours.indexOf(shift.startTime.slice(0,2) + shift.startTime.slice(5)) + 'h' } */}
                                                        </div>
                                                    <div className="position">
                                                        { shift.position }
                                                    </div>
                                                    </div>
                                                </div>
                                                <div className="edit btn-group flex align-between w-100 h-100">
                                                    <div className="btn">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                            <path d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10zM.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708l-2-2zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8z"/>
                                                        </svg>
                                                    </div>
                                                    <div className="btn w-100">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                                    </svg>
                                                    </div>
                                                    <div className="btn">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        })}
        <div className="flex">
            {hours.map((time, index) => { // loop for each hour
            return (
                <div 
                    key={`openshift-day-${time}`}
                    id={ `${time}` }
                    className="col section-holder"
                >
                    <div className="flex flex-col">
                        <div className="create-shift flex align-end" title="Create Shift">
                            <div className="flex align-center w-100 h-100">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                    <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            )})}
        </div>
        </>
    )
}

export default DayShift