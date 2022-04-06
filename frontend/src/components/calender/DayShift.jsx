import { useRef } from 'react';
import { hours } from '../../constance/dummyData';

const DayShift = ({ dateControl, startDate, date, onMouseDownResize, shifts }) => {

    const useRefff = useRef(null);

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
                                        ref={useRefff}
                                            className="shift-parent flex align-between"
                                            style={{
                                                width: `${100*(
                                                    +(hours.indexOf(shift.endTime.slice(0,2) + shift.endTime.slice(5))) - hours.indexOf(shift.startTime.slice(0,2) + shift.startTime.slice(5))+1
                                                    )}%`
                                            }}
                                        >
                                            {console.log(useRefff.current)}
                                            <div className={`shift w-100 h-100 ${ shift.color }`}>
                                                <div 
                                                    onMouseDown={(e) => {onMouseDownResize(e, index)}}
                                                    className="stretch"
                                                ></div>
                                                <div className="time flex align-between w-100 h-100">
                                                    <div>
                                                        { shift.startTime }
                                                        <hr />
                                                        { shift.endTime }
                                                    </div>
                                                    <div className="flex align-center">
                                                        <div className="total-hours">
                                                            { (hours.indexOf(shift.endTime.slice(0,2) + shift.endTime.slice(5))) - hours.indexOf(shift.startTime.slice(0,2) + shift.startTime.slice(5)) + 'H' }
                                                        </div>
                                                    <div className="position">
                                                        { shift.position }
                                                    </div>
                                                    </div>
                                                </div>
                                                <div className="edit btn-group flex align-between w-100 h-100">
                                                    <div className="btn btn-outline ">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                            <path d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10zM.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708l-2-2zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8z"/>
                                                        </svg>
                                                    </div>
                                                    <div className="btn btn-outline w-100">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                                    </svg>
                                                    </div>
                                                    <div className="btn btn-outline">
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
                            <div className="flex align-center w-100 h-100 bg-light">
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