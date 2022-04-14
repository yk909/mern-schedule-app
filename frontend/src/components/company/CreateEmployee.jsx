import { useState, useEffect } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../';
import { customSelectModalStyles } from '../../constance/dummyData';
import { toast } from 'react-toastify';
import { createEmployee } from '../../features/business/businessSlice';

const CreateEmployee = ({positions, business}) => {
    const [isNew, setIsNew] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const positionsSelect = positions.length > 0 ? positions.map(position => {
        return {
            value: position,
            label: position
        }
    }) : [];
    const [newEmployee, setNewEmployee] = useState({
        firstName: '',
        lastName: '',
        position: positions.length > 0 ? positionsSelect[0] : '',
        wage: 0,
        business: business._id
    });
    const [inviteEmployee, setInviteEmployee] = useState({
        email: '',
        position: positions.length > 0 ? positionsSelect[0] : '',
        business: business._id
    });

    const dispatch = useDispatch();
    const { isErrorEmployee, msg } = useSelector(state => state.business);

    const onChange = (e) => {
        setNewEmployee({
            ...newEmployee,
            [e.target.name]: e.target.value
        });
    }

    const onChangeInvite = (e) => {
        setInviteEmployee({
            ...newEmployee,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = () => {
        if(isNew) {
            if(!newEmployee.firstName || !newEmployee.lastName) {
                toast.error('Please fill all fields');
                return;
            } else {
                const employee = {
                    ...newEmployee,
                    position: newEmployee.position?.value,
                }
                console.log(employee);
                dispatch(createEmployee(employee));
                setIsModalOpen(false);
                setNewEmployee({
                    firstName: '',
                    lastName: '',
                    position: positions.length > 0 ? positionsSelect[0] : '',
                    wage: 0,
                    business: business._id
                });
            }
        }

        if(!isNew) {
            if(!inviteEmployee.email || !inviteEmployee.position) {
                toast.error('Please fill all fields');
                return;
            } else {
                const employee = {
                    ...inviteEmployee,
                    position: inviteEmployee.position.value
                }
                console.log('inviteEmployee', employee);
            }
        }
    };

    useEffect(() => {
        if(isErrorEmployee && msg) {
            toast.error(msg);
        }
    }, [msg, dispatch]);


    return (
        <>
        <Modal
            setModalIsOpen={setIsModalOpen}
            modalIsOpen={isModalOpen}
            actionBtnText="Add"
            contentLabel={`New Employee for ${business.name}`}
            onSubmit={onSubmit}
        >
            <div className="nav-tab-select">
                <p className={`${!isNew ? 'selected' : ''}`} onClick={() => setIsNew(false)}>Invite By Email</p>
                <p className={`${isNew ? 'selected' : ''}`} onClick={() => setIsNew(true)}>Create New</p>
            </div>
            <div className="employee-form">
                {isNew ? (
                <>
                    <div className="form-group-row">
                        <div className="form-group">
                            <label>First Name *</label>
                            <input 
                                type="text" 
                                name="firstName"
                                value={newEmployee.firstName} 
                                placeholder="Enter first name" 
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name *</label>
                            <input 
                                type="text" 
                                name="lastName"
                                value={newEmployee.lastName} 
                                placeholder="Enter last name" 
                                onChange={onChange}
                            />
                        </div>
                    </div>
                    <div className="form-group-row">
                        <div className="form-group">
                            <label>Position</label>
                            <Select
                                value={newEmployee.position}
                                onChange={(e) => setNewEmployee({...newEmployee, position: e})}
                                options={positionsSelect}
                                styles={customSelectModalStyles}
                            />
                        </div>
                        <div className="form-group">
                            <label>Wage</label>
                            <input 
                                type="number" 
                                name="wage"
                                value={newEmployee.wage} 
                                onChange={onChange} 
                                min={0} 
                            />
                        </div>
                    </div>
                </>
                ) : (
                <>
                    <div className="form-group-row">
                        <div className="form-group">
                            <label>Email *</label>
                            <input 
                                type="email" 
                                name="email"
                                value={inviteEmployee.email} 
                                onChange={onChangeInvite} 
                                placeholder="Enter user's email" />
                        </div>
                        <div className="form-group">
                            <label>Position *</label>
                            <Select
                                value={inviteEmployee.position}
                                name="position"
                                onChange={(e) => setInviteEmployee({...inviteEmployee, position: e})}
                                options={positionsSelect}
                                styles={customSelectModalStyles}
                            />
                        </div>
                    </div>
                </>
                )}
            </div>
        </Modal>
        <div onClick={() => setIsModalOpen(true)} className="business-card-body-employee create-employee-btn">
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