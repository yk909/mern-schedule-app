import { useState } from 'react';
import { Modal } from '../';

const EmployeeCard = ({employee}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
        <Modal
            setModalIsOpen={setIsModalOpen}
            modalIsOpen={isModalOpen}
            actionBtnText="Save"
            contentLabel={`${employee.firstName} ${employee.lastName}`}
        >
        </Modal>
        <div 
            onClick={() => setIsModalOpen(true)}
            className="business-card-body-employee">
            <div className={`${employee.user ? 'verified' : 'not-verified'}`}>
            {employee.user ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            )}
            </div>
            <div className="business-card-body-employee-image">
                { employee.profilePicture ? 
                    <img src={employee.profilePicture} alt={employee.name} /> 
                : 
                    <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="employee" />
                }
            </div>
            <div className="business-card-body-employee-name">
                {employee.firstName} {employee.lastName}
            </div>
        </div>
        </>
    )
}

export default EmployeeCard