import { DayShift, WeekShift } from '../';


import { employees, hours } from '../../constance/dummyData';

const UserShift = ({dateControl, employees, shifts, date, toDate, fromDate}) => {

    return (
        <>
        {employees && employees.filter(a => !a.isOwner).map((employee, i) => {
            return (
            <div key={`uid-${employee._id}`} id={`uid-${employee._id}`} className="section-row user-row flex">
                <div className="section-title flex align-center">
                    <div className="section-content w-100 flex align-between">
                        <div className="flex align-center h-100">
                            <div className="section-img flex align-center">
                                <img src="https://via.placeholder.com/150" alt=""/>
                            </div>
                            <div className="section-details">
                                <div className="section-name">
                                    {employee.firstName} {employee.lastName}
                                </div>
                                <div className="section-hours">
                                    <div>
                                        {employee.position}
                                    </div>
                                    <div className="flex align-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                                        </svg>
                                        23
                                        {/* {
                                            dateControl.value === "day" ?
                                                shifts.reduce((a, b) => {
                                                    return (
                                                        hours.includes(b.startTime.slice(0,2) + b.startTime.slice(5)) &&
                                                        (b.date === `${fromDate.getFullYear()}-${fromDate.getMonth()+1}-${fromDate.getDate()}`) ?
                                                        a +(hours.indexOf(b.endTime.slice(0,2) + b.endTime.slice(5))) - hours.indexOf(b.startTime.slice(0,2) + b.startTime.slice(5))
                                                    : a)
                                                }, 0)
                                            :
                                            shifts.reduce((a, b) => {
                                                return (
                                                    hours.includes(b.startTime.slice(0,2) + b.startTime.slice(5)) ?
                                                    a +(hours.indexOf(b.endTime.slice(0,2) + b.endTime.slice(5))) - hours.indexOf(b.startTime.slice(0,2) + b.startTime.slice(5))
                                                : a)
                                            }, 0)
                                        } */}
                                        /40
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="btn-icon btn-icon">
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
                        shifts={shifts && shifts.filter(shift => shift.employee === employee._id)}
                    />
                :
                    <DayShift
                        employee={employee}
                        dateControl={dateControl}
                        date={date}
                        shifts={shifts}
                        fromDate={fromDate}
                    />
                }
            </div>
            )
        })}
        </>
    )
}

export default UserShift