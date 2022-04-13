import { useState } from 'react';
import Select from 'react-select';
import { Modal } from '../';
import { customSelectModalStyles } from '../../constance/dummyData';

const CreateEmployee = ({positions}) => {
    const [isNew, setIsNew] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isManager, setIsManager] = useState(false);
    const [email, setEmail] = useState('');
    const [wage, setWage] = useState(0);

    const positionsSelect = positions.map(position => {
        return {
            value: position,
            label: position
        }
    });
    const [position, setPosition] = useState(positionsSelect[0]);

    return (
        <>
        <Modal
            setModalIsOpen={setIsModalOpen}
            modalIsOpen={isModalOpen}
            actionBtnText="Add"
            contentLabel={`Create an Employee`}
        >
            <div className="employee-add-select">
                <p className={`${!isNew ? 'selected' : ''}`} onClick={() => setIsNew(false)}>Add By Email</p>
                <p className={`${isNew ? 'selected' : ''}`} onClick={() => setIsNew(true)}>Create New</p>
            </div>
            <div className="employee-form">
                {isNew ? (
                <>
                    <div className="form-group-row">
                        <div className="form-group">
                            <label>Is Manager</label>
                            <Select
                                value={isManager}
                                onChange={(e) => { setIsManager(e) }}
                                options={[{ value: true, label: 'true' }, { value: false, label: 'false' }]}
                                styles={customSelectModalStyles}
                            />
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
                    <div className="form-group">
                        <label>Wage</label>
                        <input type="number" value={wage} onChange={(e) => setWage(e.target.value)} min={0} />
                    </div>
                </>
                ) : (
                <>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
                    </div>
                </>
                )}
            </div>
        </Modal>
        <div onClick={() => setIsModalOpen(true)} className="business-card-body-employee">
            <div className="business-card-body-employee-image">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                </svg>
            </div>
        </div>
        </>
    )
}

export default CreateEmployee