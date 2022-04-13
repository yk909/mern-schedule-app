import { DayShift, WeekShift } from '../';
import { employees, hours } from '../../constance/dummyData';


const UserShift = ({dateControl, date, startDate}) => {
    return (
        <>
        {employees.map((employee, i) => {
            return (
            <div key={`uid-${employee.id}`} id={`uid-${employee.id}`} className="section-row user-row flex">
                <div className="section-title flex align-center">
                    <div className="section-content w-100 flex align-between">
                        <div className="flex align-center h-100">
                            <div className="section-img flex align-center">
                                <img src="https://via.placeholder.com/150" alt=""/>
                            </div>
                            <div className="section-details">
                                <div className="section-name">
                                    {employee.user.firstName}
                                </div>
                                <div className="section-hours">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                                    </svg>
                                    {
                                        dateControl.value === "day" ?
                                            employee.shifts.reduce((a, b) => {
                                                return (
                                                    hours.includes(b.startTime.slice(0,2) + b.startTime.slice(5)) &&
                                                    (b.date === `${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()}`) ?
                                                    a +(hours.indexOf(b.endTime.slice(0,2) + b.endTime.slice(5))) - hours.indexOf(b.startTime.slice(0,2) + b.startTime.slice(5))
                                                : a)
                                            }, 0)
                                        :
                                        employee.shifts.reduce((a, b) => {
                                            return (
                                                hours.includes(b.startTime.slice(0,2) + b.startTime.slice(5)) ?
                                                a +(hours.indexOf(b.endTime.slice(0,2) + b.endTime.slice(5))) - hours.indexOf(b.startTime.slice(0,2) + b.startTime.slice(5))
                                            : a)
                                        }, 0)
                                    }
                                    /40
                                </div>
                            </div>
                        </div>
                        <div className="btn-icon btn-icon-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                            </svg>
                        </div>
                    </div>
                </div>
                { dateControl.value != "day" ?
                    <WeekShift
                        employee={employee}
                        dateControl={dateControl}
                        date={date}
                        shifts={employee.shifts}
                    />
                :
                    <DayShift
                        employee={employee}
                        dateControl={dateControl}
                        date={date}
                        shifts={employee.shifts}
                        startDate={startDate}
                    />
                }
            </div>
            )
        })}
        </>
    )
}

export default UserShift