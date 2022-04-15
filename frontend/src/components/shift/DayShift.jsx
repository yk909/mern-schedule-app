import { useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { editShift } from '../../features/shift/shiftSlice';
import { hours } from '../../constance/dummyData';
import { CreateShift, Shift } from '../';


const DayShift = ({ dateControl, startDate, date, shifts, employee }) => {
    const [endTimeOnResize, setEndTimeOnResize] = useState({});
    const dispatch = useDispatch();

    const [{ isOver, canDrop }, drop] = useDrop({
        accept: 'shift',
        drop: (item) => {
            const element = document.getElementsByClassName('over')[0];
            moveShift(item)
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    });

    const moveShift = (item) => {
        console.log(item);

        // return setShiftsArr([...shiftsArr, item.shift]);
    }

    const onMouseDownResize = (e, index, startTime, shiftId) => {
        e.preventDefault();
        const minStep = 70; // min box width

        const onMouseMove = (e) => {
            const shiftParent = document.getElementById(shiftId);
            let newWidth = e.pageX - 15 - shiftParent.getBoundingClientRect().left; // 25 is an offset to make the width of the div to be the same as the width of the mouse pointer
            let withPercent = +(Math.round(1000*(newWidth / minStep)) / 100).toFixed(0)

            if ( newWidth >= minStep && newWidth <= (24-index)*70 ) { // 25 is the number of boxes in a row, 70 is the width of a box, index is box index
                if (shiftParent.style.width !== ((withPercent * 10 -((+startTime.slice(3, 5) / 60) * 100) ) +"%")) {
                    let minutes = ((withPercent/10 % 1).toFixed(1) * 60);
                    let hour = hours[index+Math.trunc(withPercent/10)] ? hours[index+Math.trunc(withPercent/10)].slice(0, 2) : '24';
                    let newEndTime =  hour + ":" + (minutes < 10 ? "0"+minutes : minutes);

                    setEndTimeOnResize({...endTimeOnResize, [index]: newEndTime});
                    shiftParent.style.width = (withPercent * 10 -((+startTime.slice(3, 5) / 60) * 100) ) +"%";
                }
            }
        };

        const onMouseUp = () => {
            const endTime = document.getElementById(shiftId).getElementsByClassName('clock-time')[0].innerHTML.split('<hr>')[1];

            dispatch(editShift({id: shiftId, endTime: endTime}))
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };

        if (document.getElementById(shiftId)) {
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onMouseUp);
        }
    };

    return (
        <div
            ref={drop}
            className={`pos-relative ${isOver ? 'day-shift-over' : ''}`}
            style={{
                opacity: isOver ? 0.5 : 1,
            }}
        >
        { shifts && employee && shifts.map((shift, e) => {
            return (
                new Date(shift.date).toLocaleString('en-us', { year: 'numeric', day: 'numeric', month: 'numeric' }) === 
                new Date(startDate).toLocaleString('en-us', { year: 'numeric', day: 'numeric', month: 'numeric' }) &&
                employee._id === shift.employee &&
                
                <div 
                    key={`shift-row-${e}`} 
                    className="flex"
                >
                    { hours.map((time, index) => { // loop for each hour
                        return (
                            <div 
                                key={`shift-day-${time}`}
                                id={ `${time}` }
                                className="col section-holder"
                            >
                                {time === (shift.startTime.slice(0,2) + ":00") &&
                                    <Shift
                                        shift={shift}
                                        employee={employee}
                                        index={index}
                                        onMouseDownResize={onMouseDownResize}
                                        endTimeOnResize={endTimeOnResize}
                                    />
                                }
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
                        <CreateShift 
                            date={startDate}
                            employee={employee}
                        />
                    </div>
                </div>
            )})}
        </div>
    </div>
    )
}

export default DayShift