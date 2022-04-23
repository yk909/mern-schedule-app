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
                            <Link to={`/scheduler/${shift.business._id}`} className="text-hover text-headline">
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
                        <div className="user-open-shifts-shift-body">
                            <div className="flex align-between">
                                <div className="text-box">
                                    <p>
                                        {shift.startTime}
                                    </p>
                                    <hr />
                                    <p>
                                        {shift.endTime}
                                    </p>
                                </div>
                                <div className="text-box">
                                    <p>{countTotalShiftHours(shift.startTime, shift.endTime)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="user-open-shifts-shift-footer">
                            <button
                                className="btn btn-primary mt-1 w-100"
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