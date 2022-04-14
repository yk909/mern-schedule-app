import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../';
import { editEmployee, deleteEmployee } from '../../features/business/businessSlice';
import { customSelectModalStyles } from '../../constance/dummyData';
import './styles/EmployeeCard.css';

const EmployeeCard = ({employee, isManager, positions, businesses}) => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const { isLoadingEmployee } = useSelector(state => state.business);

    const [editUser, setEditUser] = useState({
        _id: employee._id,
        isManager: {value: isManager, label: isManager.toString()},
        position: positionsSelect.filter(position => position.value === employee.position)[0],
        business: businessesSelect.filter(business => business.value === employee.business || business.value === employee.business._id)[0],
        wage: employee.wage
    });

    useEffect(() => {
        if (!isLoadingEmployee) {
            setIsModalOpen(false);
        }
    }, [isLoadingEmployee])


    const onSubmit = () => {
        const user = {
            ...editUser,
            isManager: editUser.isManager.value,
            position: editUser.position?.value,
            business: editUser.business?.value
        }
        dispatch(editEmployee(user));
    }

    const onSubmitDanger = () => {
        dispatch(deleteEmployee(employee._id));
        setIsModalOpen(false);
    }


    return (
        <>
        <Modal
            setModalIsOpen={setIsModalOpen}
            modalIsOpen={isModalOpen}
            actionBtnText="Save"
            contentLabel={`${employee.firstName} ${employee.lastName}`}
            actionDangerBtnText="Delete Employee"
            onSubmit={onSubmit}
            onSubmitDanger={onSubmitDanger}
        >
            <div className="employee-form">
                <div className="form-group-row">
                    <div className="form-group">
                        <label>Is Manager</label>
                        <Select
                            value={editUser.isManager}
                            onChange={(e) => { setEditUser({...editUser, isManager: e}) }}
                            options={[{ value: true, label: 'true' }, { value: false, label: 'false' }]}
                            styles={customSelectModalStyles}
                        />
                    </div>
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
        <div 
            onClick={() => setIsModalOpen(true)}
            className="business-card-body-employee">
            <div className="user-bg" />
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
        </>
    )
}

export default EmployeeCard