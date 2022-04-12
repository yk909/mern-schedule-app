import { useState } from 'react';
import Select from 'react-select';
import { customSelectModalStyles, hours, positions } from '../../constance/dummyData';
import { Modal } from '../';

const positionsSelect = positions.map(position => {
    return {
        value: position,
        label: position
    }
})

const CreateShift = ({ date, employee }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [startFrom, setStartFrom] = useState(null);
    const [endTo, setEndTo] = useState(null);
    const [position, setPosition] = useState(null);

    const hoursSelectStart = hours
        .filter((hour, index) => {
            return endTo ? index < hours.indexOf(endTo.value) : true;
        })
        .map(hour => {
            return {
                value: hour,
                label: hour
            }
        })

    const hoursSelectEnd = hours
        .filter((hour, index) => {
            return startFrom ? index > hours.indexOf(startFrom.value) : true;
        })
        .map(hour => {
            return {
                value: hour,
                label: hour
            }
        })

    return (
    <>
        <Modal
        setModalIsOpen={setModalIsOpen}
        modalIsOpen={modalIsOpen}
        actionBtnText="Save"
        contentLabel={
            `Create ${employee ? 
            'Shift for ' + employee.user.firstName 
            : 'Open Shift'} on ${date.toLocaleString('en-us', {  weekday: 'short', month: 'short', day: 'numeric' })}`
            }
        >
            <div className="create-shift-form">
                <div className="form-group-row">
                    <div className="form-group">
                        <label>Start</label>
                        <Select
                        value={startFrom}
                        onChange={(e) => {setStartFrom(e);}}
                        options={hoursSelectStart}
                        styles={customSelectModalStyles}
                        />
                    </div>
                    <div className="form-group">
                        <label>End</label>
                        <Select
                        value={endTo}
                        onChange={(e) => {setEndTo(e);}}
                        options={hoursSelectEnd}
                        styles={customSelectModalStyles}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Position</label>
                    <Select
                    value={position}
                    onChange={(e) => {setPosition(e);}}
                    options={positionsSelect}
                    styles={customSelectModalStyles}
                    />
                </div>
            </div>
        </Modal>
        <div className="create-shift flex align-end" title="Create Shift">
            <div className="flex align-center w-100 h-100" onClick={() => setModalIsOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                </svg>
            </div>
        </div>
    </>
    )
}

export default CreateShift