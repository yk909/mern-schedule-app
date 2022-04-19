import {ShiftsList} from '../';

const WeekShift = ({dateControl, fromDate, employee}) => {

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
                        fromDate={fromDate}
                        i={i}
                    />
                )
            })}
        </div>
    )
}


export default WeekShift