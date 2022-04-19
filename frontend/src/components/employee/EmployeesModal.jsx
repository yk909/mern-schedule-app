import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Modal } from '../';
import Select from 'react-select';
import { changeRole, removeUser } from "../../features/company/companySlice";
import './styles/EmployeesModal.css';
import { customSelectModalStyles } from '../../constance/localData';

const EmployeesModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({
        user: null
    });
    const company = useSelector(state => state.company.company);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();


    const onSubmitRole = (user, role) => {
        const data = {
            id: company._id,
            userId: user,
            role: role
        }
        dispatch(changeRole(data));
        setIsModalOpen(false);
    }

    const onSubmitDelete = () => {
        const data = {
            id: company._id,
            userId: updatedUser._id
        }
        dispatch(removeUser(data));
        setIsDeleteModalOpen(false);
    }

    return (
        <>
            <Modal
                setModalIsOpen={setIsModalOpen}
                modalIsOpen={isModalOpen}
                bodyStyles={{
                    padding: '0px',
                    margin: '0px',
                }}
                contentLabel={`${company.name} Employees`}
            >
                <div className="users-modal">
                {company.employees.map(user => {
                    return (
                        <div className="user-card" key={`user-modal-${user._id}`}>
                            <div className="user-card-left">
                                <div className="user-card-image">
                                    { user.profilePicture ? 
                                        <img src={user.profilePicture} alt={user.name} /> 
                                    : 
                                        <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="user" />
                                    }
                                </div>
                                <div className="ml-1">
                                    <div>
                                        <div className="user-card-name">
                                            {user.firstName} {user.lastName}
                                        </div>
                                        <div className="user-card-email">
                                            {user.email}
                                        </div>
                                    </div>
                                    <div className="user-card-wage">
                                        {user.wage}
                                    </div>
                                </div>
                            </div>
                                <div className="user-card-right flex align-center">
                                    {company.user !== user._id ?
                                    <>
                                    {company.owners.includes(auth.user._id) && (
                                        <div 
                                            className="btn btn-outline-danger mr-1"
                                            onClick={() => {setIsDeleteModalOpen(true); setUpdatedUser(user);}}
                                        >
                                            Remove
                                        </div>
                                    )}
                                    {company.user === auth.user._id && (
                                        <Select
                                            value={{
                                                value: user._id,
                                                label: company.owners.includes(user._id) ? 'Owner' : 'Employee'
                                            }}
                                            onChange={(e) => {onSubmitRole(user._id, e.value)}}
                                            options={[
                                                { value: 'owner',
                                                label: 'Owner' },
                                                { value: 'employee',
                                                label: 'Employee'}
                                            ]}
                                            isSearchable={false}
                                            styles={customSelectModalStyles}
                                        />
                                    )}
                                    </>
                                    :
                                        <p>
                                            Company's Owner
                                        </p>
                                    }
                                </div>
                        </div>
                    )
                })}
                </div>
            </Modal>
            <Modal
                setModalIsOpen={setIsDeleteModalOpen}
                modalIsOpen={isDeleteModalOpen}
                contentLabel={`Are you sure, you want to remove ${updatedUser?.firstName}?`}
            >
                <div className="form-group-row">
                    <div className="form-group">
                        <div
                            className="btn btn-primary"
                            onClick={() => setIsDeleteModalOpen(false)}
                        >Cancel</div>
                    </div>
                    <div className="form-group">
                        <div 
                            className="btn btn-danger"
                            onClick={onSubmitDelete}
                        >Remove</div>
                    </div>
                </div>
            </Modal>
            <div 
                className="company-card-detail employees-btn"
                onClick={() => setIsModalOpen(true)}
            >
                <div className="company-card-detail-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                    </svg>
                </div>
                <div className="company-card-detail-text">
                    <p>Employees</p>
                    <p>{company.employees.length}</p>
                </div>
            </div>
        </>
    )
}

export default EmployeesModal