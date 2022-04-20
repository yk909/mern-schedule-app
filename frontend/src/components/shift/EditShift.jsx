import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { Modal, ManagerProtect } from '../';
import { deleteShift, editShift } from '../../features/shift/shiftSlice';

import { customSelectModalStyles, hoursArray, positions } from '../../constance/localData';

const positionsSelect = positions.map(position => {
    return {
        value: position,
        label: position
    }
})

const EditShift = ({ employee, shift, modalIsOpen, setModalIsOpen }) => {
    const dispatch = useDispatch();

    const [newShift, setNewShift] = useState({
        startTime: {value: shift.startTime, label: shift.startTime},
        endTime: {value: shift.endTime, label: shift.endTime},
        position: null,
        note: shift.note ? shift.note : ''
    });

    const hoursSelectStart = hoursArray
        .filter((hour, index) => {
            return newShift.endTime ? index < hoursArray.indexOf(newShift.endTime.value) : true;
        })
        .map(hour => {
            return {
                value: hour,
                label: hour
            }
        })

    const hoursSelectEnd = hoursArray
        .filter((hour, index) => {
            return newShift.startTime ? index > hoursArray.indexOf(newShift.startTime.value) : true;
        })
        .map(hour => {
            return {
                value: hour,
                label: hour
            }
        })


    const onSubmit = () => {
        if(newShift.startTime && newShift.endTime) {
            dispatch(editShift({
                id: shift._id,
                startTime: newShift.startTime.value,
                endTime: newShift.endTime.value,
                position: newShift.position ? newShift.position.value : shift.position,
                note: newShift.note
            }))
            setModalIsOpen(false);
        } else {
            toast.error("Please select start and end time");
        }
    }

    const onSubmitDanger = () => {
        dispatch(deleteShift(shift._id, newShift));
        setModalIsOpen(false);
    }


    return (
    <>
        <Modal
            setModalIsOpen={setModalIsOpen}
            modalIsOpen={modalIsOpen}
            actionBtnText="Save"
            onSubmit={onSubmit}
            onSubmitDanger={onSubmitDanger}
            actionDangerBtnText="Delete"
            contentLabel={
                    `Edit ${employee ? 
                    'Shift for ' + employee.firstName 
                    : 'Open Shift'} on ${new Date(shift.date).toLocaleString('en-us', {  weekday: 'short', month: 'short', day: 'numeric' })}`
                }
        >
            <div className="create-shift-form">
                <ManagerProtect>
                    <div className="form-group-row">
                        <div className="form-group">
                            <label>Start *</label>
                            <Select
                            value={newShift.startTime}
                            onChange={(e) => {setNewShift({...newShift, startTime: e})}}
                            options={hoursSelectStart}
                            styles={customSelectModalStyles}
                            />
                        </div>
                        <div className="form-group">
                            <label>End *</label>
                            <Select
                            value={newShift.endTime}
                            onChange={(e) => {setNewShift({...newShift, endTime: e});}}
                            options={hoursSelectEnd}
                            styles={customSelectModalStyles}
                            />
                        </div>
                    </div>
                </ManagerProtect>
                <div className="form-group-row">
                    <div className="form-group">
                        <label>Note</label>
                        <input
                            placeholder="Enter any notes"
                            value={newShift.note}
                            onChange={(e) => {setNewShift({...newShift, note: e.target.value})}}
                        />
                    </div>
                <ManagerProtect>
                    {(!shift.employee) && (
                        <div className="form-group">
                            <label>Position</label>
                            <Select
                                value={newShift.position}
                                onChange={(e) => { setNewShift({ ...newShift, position: e })} }
                                options={positionsSelect}
                                styles={customSelectModalStyles}
                            />
                        </div>
                    )}
                </ManagerProtect>
                </div>
            </div>
        </Modal>
    </>
    )
}

export default EditShift