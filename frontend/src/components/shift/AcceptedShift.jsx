import { countAsignedTotalHours } from '../../constance/helpers'; 
import { DayShift, WeekShift } from '../';
import { useSelector } from "react-redux";

const AcceptedShift = ({ dateControl, fromDate, toDate, startDate  }) => {
    const employeesUID = useSelector(state => state.shift.employees)?.map(e => e.user);
    const weekShifts = useSelector(state => state.shift.shifts)?.filter(shift =>
        shift.acceptedBy && !shift.employee &&
        !employeesUID.includes(shift.acceptedBy._id)
    );

    return (
        <>
        {weekShifts && weekShifts.length > 0 && (
        <div className="section-row flex accepted-shift user-row">
            <div className="section-title flex align-center">
                <div className="section-content flex align-between">
                    <div className="flex align-center">
                        <div className="section-img">
                        </div>
                        <div className="section-details">
                            <div className="section-name">
                                Picked Up Shift
                            </div>
                            <div className="section-hours">
                                <div className="flex align-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                                    </svg>
                                    {countAsignedTotalHours(weekShifts, dateControl.value === 'day' ? startDate : null, fromDate, toDate)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                {dateControl.value != "day" ?
                    <WeekShift
                        dateControl={dateControl}
                        fromDate={fromDate}
                        acceptedShifts={weekShifts}
                    />
                :
                    <DayShift
                        dateControl={dateControl}
                        startDate={startDate}
                        fromDate={fromDate}
                        acceptedShifts={weekShifts}
                    />
                }
        </div>
        )}
        </>
    )
}

export default AcceptedShift