import { DayShift, WeekShift } from '../';
import { openShifts, hours } from '../../constance/dummyData'

const OpenShift = ({ dateControl, startDate, date, onMouseDownResize }) => {

    return (
        <div className="section-row flex open-shift user-row">
            <div className="section-title flex align-center">
                <div className="section-content h-100 w-100 flex align-between">
                    <div className="flex align-center">
                        <div className="section-img">
                        </div>
                        <div className="section-details">
                            <div className="section-name">
                                Open Shift
                            </div>
                            <div className="section-hours">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                                </svg>
                                {
                                    dateControl.value === "day" ?
                                        openShifts.reduce((a, b) => {
                                            return (
                                                hours.includes(b.startTime.slice(0,2) + b.startTime.slice(5)) &&
                                                (b.date === `${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()}`) ?
                                                a +(hours.indexOf(b.endTime.slice(0,2) + b.endTime.slice(5))) - hours.indexOf(b.startTime.slice(0,2) + b.startTime.slice(5))
                                            : a)
                                        }, 0)
                                    :
                                    openShifts.reduce((a, b) => {
                                        return (
                                            hours.includes(b.startTime.slice(0,2) + b.startTime.slice(5)) ?
                                            a +(hours.indexOf(b.endTime.slice(0,2) + b.endTime.slice(5))) - hours.indexOf(b.startTime.slice(0,2) + b.startTime.slice(5))
                                        : a)
                                    }, 0)
                                }
                            </div>
                        </div>
                    </div>
                    <div className="btn-icon" title="Add New Employee">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div className="pos-relative">
                { dateControl.value != "day" ?
                    <WeekShift
                        dateControl={dateControl}
                        date={date}
                        shifts={openShifts}
                    />
                :
                    <DayShift
                        dateControl={dateControl}
                        date={date}
                        onMouseDownResize={onMouseDownResize}
                        shifts={openShifts}
                        startDate={startDate}
                    />
                }
            </div>
        </div>
    )
}

export default OpenShift