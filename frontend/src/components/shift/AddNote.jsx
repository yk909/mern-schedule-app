import { useState } from 'react';
import { EditShift } from '../';
import { countTotalShiftHours } from '../../constance/helpers';

const AddNote = ({ shift }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    return (
        <>
            <div className="user-open-shifts-shift-body" onClick={() => setModalIsOpen(true)}>
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
            <EditShift
                shift={shift}
                employee={shift.employee}
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
            />
        </>
    )
}

export default AddNote