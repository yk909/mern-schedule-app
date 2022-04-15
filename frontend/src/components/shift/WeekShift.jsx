import { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { hours } from '../../constance/dummyData';
import { ShiftsList } from '../';


const WeekShift = ({dateControl, fromDate, shifts, employee}) => {
    // const [shiftsArr, setShiftsArr] = useState([]);

    // useEffect(() => {
    //     setShiftsArr(shifts);
    // }, []);
    
    return (
            <div className="flex">
                {[...Array(
                    dateControl.value === "week" ?
                        7 
                    : dateControl.value === "2week" ?
                        14
                    :
                        28
                ).keys()].map((i) => { // loop for each day
                    return (
                        <ShiftsList
                            employee={employee}
                            key={`open-shift-day-${i}`}
                            shifts={shifts}
                            // shiftsArr={shiftsArr}
                            // setShiftsArr={setShiftsArr}
                            fromDate={fromDate}
                            i={i}
                        />
                    )
                })}
            </div>
    )
}

export default WeekShift