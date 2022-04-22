import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { copyPreviousWeekShifts } from '../../features/shift/shiftSlice';
import { Modal } from '../';

const CopyShifts = ({dateControl, fromDate, toDate}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const dispatch = useDispatch();
    const { id } = useParams();

    const onSubmit = () => {
        const data = {
            business: id,
            fromDate: fromDate.setHours(0,0,0,0), 
            toDate: toDate.setHours(0,0,0,0),
            dateControl: dateControl.value
        }
        dispatch(copyPreviousWeekShifts(data));
        setModalIsOpen(false);
    };

    return (
        <>
            <Modal
                contentLabel={`Are you sure you want to copy ${dateControl.label} shifts?`}
                setModalIsOpen={setModalIsOpen}
                modalIsOpen={modalIsOpen}
            >
                <p>
                    From <b>{fromDate.toLocaleString("en-US", { month: 'short', day: 'numeric' })}</b> - <b>{toDate.toLocaleString("en-US", { month: 'short', day: 'numeric' })}</b>
                </p>
                <p>
                    To <b>{new Date(fromDate.setHours(0, 0, 0, 0) + 
                        ((dateControl.value === 'week' ?
                            7
                        : dateControl.value === '2week' ?
                            14
                        : dateControl.value === '4week' ?
                            28
                        : 1)
                        * 24 * 60 * 60 * 1000)) .toLocaleString("en-US", { month: 'short', day: 'numeric' })}</b> - <b>{new Date(toDate.setHours(0, 0, 0, 0) + 
                        ((dateControl.value === 'week' ?
                            7
                        : dateControl.value === '2week' ?
                            14
                        : dateControl.value === '4week' ?
                            28
                        : 1)
                        * 24 * 60 * 60 * 1000)) .toLocaleString("en-US", { month: 'short', day: 'numeric' })} </b>
                </p>
                <div className="form-group-row">
                    <div className="form-group">
                        <div
                            className="btn btn-outline"
                            onClick={() => setModalIsOpen(false)}
                        >Cancel</div>
                    </div>
                    <div className="form-group">
                        <div 
                            className="btn btn-primary"
                            onClick={onSubmit}
                        >Copy</div>
                    </div>
                </div>
            </Modal>
            <div className="calender-header-right">
                <div className="btn btn-outline"
                onClick={() => setModalIsOpen(true)}>
                    Copy {dateControl.label} Schedule 
                </div>
            </div>
        </>
    )
}

export default CopyShifts