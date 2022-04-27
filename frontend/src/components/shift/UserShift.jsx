import { countTotalHours } from '../../constance/helpers';
import { DayShift, WeekShift } from '../';

const UserShift = ({dateControl, employees, shifts, startDate, toDate, fromDate}) => {

    return (
        <>
        {employees && employees.filter(a => !a.isOwner).map((employee, i) => {
            return (
            <div key={`uid-${employee._id}`} id={`uid-${employee._id}`} className="section-row user-row flex">
                <div className="section-title flex align-center">
                    <div className="section-content w-100 flex align-between">
                        <div className="flex align-center h-100">
                            <div className="section-img flex align-center">
                                    { employee.profilePicture ? 
                                        <img src={employee.profilePicture} alt={employee.firstName} /> 
                                    : 
                                        <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="user" />
                                    }
                            </div>
                            <div className="section-details">
                                <div className="section-name">
                                    {employee.lastName}
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
                                        {countTotalHours(employee, shifts, dateControl.value === 'day' ? startDate : null, fromDate, toDate)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {shifts && (
                    dateControl.value != "day" ?
                        <WeekShift
                            employee={employee}
                            dateControl={dateControl}
                            fromDate={fromDate}
                        />
                    :
                        <DayShift
                            employee={employee}
                            dateControl={dateControl}
                            startDate={startDate}
                            fromDate={fromDate}
                        />
                )}
            </div>
            )
        })}
        </>
    )
}

export default UserShift