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
                                <Link to={`/scheduler/${shift.business._id}`} className="text-hover text-headline title-3">
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
                            </div>
                            <AddNote shift={shift}/>
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