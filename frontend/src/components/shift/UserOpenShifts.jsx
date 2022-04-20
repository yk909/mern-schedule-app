import { useSelector, useDispatch } from 'react-redux';
import {  Link } from 'react-router-dom';
import { pickUpShift } from '../../features/shift/shiftSlice';
import { countTotalShiftHours } from '../../constance/helpers';
import './styles/UserOpenShifts.css';

const UserOpenShifts = () => {
    const dispatch = useDispatch();
    const userOpenShifts = useSelector(state => state.shift.userShifts).filter(shift => shift.employee === null);

    return (
        <>
        <div className="user-open-shifts">
            {userOpenShifts.map(shift => {
                return (
                    <div key={`open-shift-${shift._id}`}
                        className="user-open-shifts-shift-container">
                        <div className="user-open-shifts-shift-title">
                            <Link to={`/scheduler/${shift.business._id}`} className="text-hover">
                                {shift.business.name}
                            </Link>
                            <p>
                                {new Date(shift.date).toLocaleString("en-US", { month: 'short', weekday: 'long', day: 'numeric', year: 'numeric' })}
                            </p>
                            {/* <p>
                                {shift.business.address}, {shift.business.city}, {shift.business.state}, {shift.business.zip}
                            </p> */}
                        </div>
                        <div className="user-open-shifts-shift-body">
                            <div className="flex align-between">
                                <p>
                                    {shift.startTime} - {shift.endTime}
                                </p>
                                <p>{countTotalShiftHours(shift.startTime, shift.endTime)}</p>
                            </div>
                        </div>
                        <div className="user-open-shifts-shift-footer">
                            <button
                                className="btn btn-outline mt-1 w-100"
                                onClick={() => dispatch(pickUpShift(shift._id))}>
                                Accept
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
        {userOpenShifts.length === 0 && (
            <p>
                There are no open shifts at the moment.
            </p>
        )}
        </>
    )
}

export default UserOpenShifts