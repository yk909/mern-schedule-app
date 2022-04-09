import { useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { hours } from '../../constance/dummyData';
import { Shift } from '../';


const DayShift = ({ dateControl, startDate, date, shifts }) => {
    const [endTime, setEndTime] = useState({});
    const [totalTime, setTotalTime] = useState({});
    const [shiftsArr, setShiftsArr] = useState([]);

    const [{ isOver, canDrop }, drop] = useDrop({
        accept: 'shift',
        drop: (item) => {
            moveShift(item)
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    });

    useEffect(() => {
        setShiftsArr(shifts);
    }, []);

    const moveShift = (item) => {
        // console.log(shiftsArr);

        return setShiftsArr([...shiftsArr, item.shift]);
    }

    const onMouseDownResize = (e, index, startTime, shiftId) => {
        e.preventDefault();
        const minStep = 70; // min box width

        const onMouseMove = (e) => {
            const shiftParent = document.getElementById(shiftId);
            let newWidth = e.pageX + 25 - shiftParent.getBoundingClientRect().left; // 25 is an offset to make the width of the div to be the same as the width of the mouse pointer
            let withPercent = +(Math.round(1000*(newWidth / minStep)) / 100).toFixed(0)
            const startTimeNum = +startTime.slice(0, 2);

            if ( newWidth >= minStep && newWidth <= (24-index)*70 ) { // 25 is the number of boxes in a row, 70 is the width of a box, index is box index
                let minutes = ((withPercent/10 % 1).toFixed(1) * 60);
                let hour = hours[index+Math.trunc(withPercent/10)] ? hours[index+Math.trunc(withPercent/10)].slice(0, 2) : 12;
                let newEndTime =  hour + ":" + 
                    (minutes < 10 ? "0"+minutes : minutes) +( hours[index+Math.trunc(withPercent/10)] ? hours[index+Math.trunc(withPercent/10)].slice(2) : "AM");

                setEndTime({...endTime, [index]: newEndTime});

                shiftParent.style.width = (withPercent * 10 -((+startTime.slice(3, 5) / 60) * 100) ) +"%";

                setTotalTime({...totalTime, 
                    [index]: Math.trunc(shiftParent.style.width.replace('%', '') / 100) + 'h' + (minutes !== 0 ? minutes + "m" : "")
                });
            }
        };

        const onMouseUp = () => {
            window.removeEventListener("mousemove", onMouseMove);
        };

        if (document.getElementById(shiftId)) {
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onMouseUp);
        }
    };

    return (
        <div
            className="pos-relative"
            ref={drop}
            style={{
                opacity: isOver ? 0.5 : 1,
            }}
        >
        { shiftsArr?.map((shift, e) => {
            return (
                hours.includes(shift.startTime.slice(0,2) + shift.startTime.slice(5)) &&
                shift.date === `${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()}` &&
                
                <div 
                    key={`shift-row-${e}`} 
                    className="flex"
                >
                    { hours.map((time, index) => { // loop for each day
                    
                        return (
                            <div 
                                key={`shift-day-${time}`}
                                id={ `${time}` }
                                className="col section-holder"
                            >
                                    {time === shift.startTime.slice(0,2) + shift.startTime.slice(5) &&
                                    shift.date === `${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()}` &&
                                        <Shift
                                            shift={shift}
                                            onMouseDownResize={onMouseDownResize}
                                            totalTime={totalTime}
                                            endTime={endTime}
                                            index={index}
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
        </div>
    )
}

export default DayShift