import { countTotalHours } from '../../constance/helpers'; 
import { DayShift, WeekShift } from '../';

const OpenShift = ({ dateControl, shifts, fromDate, toDate, startDate }) => {

    return (
        <div className="section-row flex open-shift user-row">
            <div className="section-title flex align-center">
                <div className="section-content flex align-between">
                    <div className="flex align-center">
                        <div className="section-img">
                        </div>
                        <div className="section-details">
                            <div className="section-name">
                                Open Shift
                            </div>
                            <div className="section-hours">
                                <div className="flex align-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                                    </svg>
                                    {countTotalHours(null, shifts, dateControl.value === 'day' ? startDate : null)}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="btn-icon btn-icon-primary" title="Add New Employee">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                        </svg>
                    </div> */}
                </div>
            </div>
            {shifts && (
                dateControl.value != "day" ?
                    <WeekShift
                        dateControl={dateControl}
                        fromDate={fromDate}
                        shifts={shifts.filter(shift => !shift.employee)}
                    />
                :
                    <DayShift
                        dateControl={dateControl}
                        startDate={startDate}
                        shifts={shifts.filter(shift => !shift.employee)}
                        fromDate={fromDate}
                    />
            )}
        </div>
    )
}

export default OpenShift