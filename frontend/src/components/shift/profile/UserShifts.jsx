import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AddNote } from '../../';

const UserShifts = ({shift}) => {
    return (
        <>
        {shift && (
            <div className="user-open-shifts-shift-container">
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
        )}
        </>
    )
}

export default UserShifts