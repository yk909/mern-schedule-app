import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { pickUpShift } from '../../features/shift/shiftSlice';
import { AddNote } from '../';
import { countTotalShiftHours } from '../../constance/helpers';
import './styles/ShiftsTable.css';

const ShiftTable = ({shifts, isOpenShift}) => {
    const dispatch = useDispatch();
    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Business</th>
                        <th className="address">Address</th>
                        <th>Date</th>
                        <th>Shift</th>
                        <th>Total Hours</th>
                        <th>Note</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {shifts.map((shift, index) => {
                        return (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>
                                    <Link to={`/scheduler/${shift.business._id}`} className="text-hover title-3">
                                        {shift.business.name}
                                    </Link>
                                </td>
                                <td className="address">{shift.business.address}, {shift.business.city}, {shift.business.state}, {shift.business.zip}</td>
                                <td className="text-center">
                                    {new Date(shift.date).toLocaleString("en-US", { month: 'short'})}
                                    <br />
                                    <b>{new Date(shift.date).toLocaleString("en-US", { weekday: 'short', day: 'numeric' })}</b>
                                </td>
                                <td>
                                    <b>{shift.startTime} - {shift.endTime}</b>
                                </td>
                                <td>{countTotalShiftHours(shift.startTime, shift.endTime)}</td>
                                <td>
                                    {shift.note && (
                                        <div className="btn btn-outline-info" onClick={() => toast.info(shift.note)}>
                                            Note
                                        </div>
                                    )}
                                </td>
                                {!isOpenShift ? (
                                    <td className="table-note"><AddNote shift={shift}/></td>
                                ) : (
                                    <td>
                                        <button
                                            className="btn btn-outline-primary w-100"
                                            onClick={() => dispatch(pickUpShift(shift._id))}>
                                            Accept
                                        </button>
                                    </td>
                                )}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ShiftTable