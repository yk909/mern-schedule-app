import { countAsignedTotalHours } from '../../constance/helpers'; 
import { DayShift, WeekShift } from '../';
import { useSelector } from "react-redux";
import { timeIcon } from '../../constance/icons';

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
                                    {timeIcon}
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