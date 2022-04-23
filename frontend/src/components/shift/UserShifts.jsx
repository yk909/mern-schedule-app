import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AddNote } from '../';
import { countTotalShiftHours } from '../../constance/helpers';

const UserShifts = () => {
    const dispatch = useDispatch();
    const userShifts = useSelector(state => state.shift.userShifts).filter(shift => shift.employee != null);
    const { user } = useSelector(state => state.auth);
    const userShiftsFiltred = userShifts.filter(shift => shift.employee.user === user._id);

    return (
        <>
            <div className="user-open-shifts">
                {userShiftsFiltred.map((shift, index) => {
                    return (
                        <div key={`open-shift-${shift._id}`}
                            className="user-open-shifts-shift-container">
                            <div className="user-open-shifts-shift-title">
                                <Link to={`/scheduler/${shift.business._id}`} className="text-hover">
                                    {shift.business.name}
                                </Link>
                                <div className="shift-body-date">
                                    <p className="text-center">
                                        {new Date(shift.date).toLocaleString("en-US", { month: 'short' })}
                                    </p>
                                    <p className="text-center">
                                        {new Date(shift.date).toLocaleString("en-US", { weekday: 'short', day: 'numeric' })}
                                    </p>
                                </div>
                                {/* <p>
                                    {shift.business.address}, {shift.business.city}, {shift.business.state}, {shift.business.zip}
                                </p> */}
                            </div>
                            <AddNote shift={shift}/>
                            {/* <div className="user-open-shifts-shift-footer">
                                <AddNote shift={shift}/>
                            </div> */}
                            {/* <div className="team">
                                <div className="team-members">
                                {userShifts.filter(a => a.date === shift.date && a.business._id === shift.business._id && a.employee !== null && a.employee.user !== user._id).map(a => {
                                        return (
                                            <div className="team-member-container">
                                                <div className="team-member">
                                                    {a.employee.profilePicture ? (
                                                        <img src={a.employee.profilePicture} alt="profile-picture" />
                                                    ) : (
                                                        <img src={`https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png`} alt="profile-picture" />
                                                    )}
                                                    <div className="team-member-shift-info">
                                                        <p>{a.employee.firstName} {a.employee.lastName}</p>
                                                        <p>{a.startTime} - {a.endTime} ({countTotalShiftHours(a.startTime, a.endTime)})</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div> */}
                        </div>
                    )
                })}
            </div>
            {userShiftsFiltred.length === 0 && (
                <p>
                    There are no open shifts at the moment.
                </p>
            )}
        </>
    )
}

export default UserShifts