import { useState } from 'react';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { Modal, ManagerProtect, OwnerProtect } from '../';
import { editEmployee, deleteEmployee } from '../../features/employee/employeeSlice';
import { customSelectModalStyles } from '../../constance/localData';
import './styles/EmployeeCard.css';

const EmployeeCard = ({employee, positions, businesses, business}) => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const businessesSelect = businesses.map(business => {
        return {
            value: business._id,
            label: business.name
        }
    });
    const positionsSelect = positions.map(position => {
        return {
            value: position,
            label: position
        }
    } );

    const [editUser, setEditUser] = useState({
        _id: employee._id,
        isManager: {value: employee.isManager, label: employee.isManager.toString()},
        position: positionsSelect.filter(position => position.value === employee.position)[0],
        business: businessesSelect.filter(business => business.value === employee.business || business.value === employee.business._id)[0],
        wage: employee.wage
    });


    const onSubmit = () => {
        const user = {
            ...editUser,
            isManager: editUser.isManager.value,
            position: editUser.position?.value,
            business: editUser.business?.value
        }
        dispatch(editEmployee(user));
        setIsModalOpen(false);
    }

    const onSubmitDanger = () => {
        dispatch(deleteEmployee(employee._id));
        setIsModalOpen(false);
        setIsDeleteModalOpen(false);
    }


    return (
        <>
        <ManagerProtect business={business}>
            <Modal
                setModalIsOpen={setIsModalOpen}
                modalIsOpen={isModalOpen}
                actionBtnText="Save"
                contentLabel={`${employee.firstName} ${employee.lastName}`}
                onSubmit={onSubmit}
                onSubmitDanger={() => setIsDeleteModalOpen(true)}
                actionDangerBtnText="Delete"
            >
                <div className="employee-form">
                    <div className="form-group-row">
                        <OwnerProtect>
                            <div className="form-group">
                                <label>Is Manager</label>
                                <Select
                                    value={editUser.isManager}
                                    onChange={(e) => { setEditUser({...editUser, isManager: e}) }}
                                    options={[{ value: true, label: 'true' }, { value: false, label: 'false' }]}
                                    styles={customSelectModalStyles}
                                />
                            </div>
                        </OwnerProtect>
                        <div className="form-group">
                            <label>Position</label>
                            <Select
                                value={editUser.position}
                                name="position"
                                onChange={(e) => { setEditUser({...editUser, position: e}) }}
                                options={positionsSelect}
                                styles={customSelectModalStyles}
                            />
                        </div>
                    </div>
                    <div className="form-group-row">
                        <div className="form-group">
                            <label>Business</label>
                            <Select
                                value={editUser.business}
                                onChange={(e) => { setEditUser({...editUser, business: e}) }}
                                options={businessesSelect}
                                styles={customSelectModalStyles}
                            />
                        </div>
                        <div className="form-group">
                            <label>Wage</label>
                            <input 
                                type="number" 
                                value={editUser.wage}
                                onChange={(e) => { setEditUser({...editUser, wage: e.target.value}) }}
                                min={0}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </ManagerProtect>
        <div 
            onClick={() => setIsModalOpen(true)}
            className="business-card-body-employee">
            <div className={`user-bg ${employee.isManager ? 'bg-info' : ''}`} />
            <div className="business-card-body-employee-image">
                { employee.profilePicture ? 
                    <img src={employee.profilePicture} alt={employee.name} /> 
                : 
                    <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="employee" />
                }
            </div>
            <div className="business-card-body-employee-name">
                
                <p>
                    {employee.user && (
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                                <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
                            </svg>
                        </span>
                    )}
                    {employee.position}
                </p>
                <p>
                    {employee.firstName} {employee.lastName}
                </p>
            </div>
        </div>
        <Modal
            setModalIsOpen={setIsDeleteModalOpen}
            modalIsOpen={isDeleteModalOpen}
            contentLabel={`Are you sure, you want to delete ${employee.firstName}?`}
        >
            <div className="form-group-row">
                <div className="form-group">
                    <div
                        className="btn btn-outline"
                        onClick={() => setIsDeleteModalOpen(false)}
                    >Cancel</div>
                </div>
                <div className="form-group">
                    <div 
                        className="btn btn-danger"
                        onClick={onSubmitDanger}
                    >Delete</div>
                </div>
            </div>
        </Modal>
        </>
    )
}

export default EmployeeCard