import { useEffect, useState } from 'react';
import { Modal } from '../';
import './styles/CreateCompany.css';

const CreateCompany = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNew, setIsNew] = useState(false);

    return (
        <>
        <Modal
        setModalIsOpen={setIsModalOpen}
        modalIsOpen={isModalOpen}
        actionBtnText="Apply"
        contentLabel={'Add Company'}
        >
            <div className="employee-add-select">
                <p className={`${!isNew ? 'selected' : ''}`} onClick={() => setIsNew(false)}>Find By Name</p>
                <p className={`${isNew ? 'selected' : ''}`} onClick={() => setIsNew(true)}>Create New</p>
            </div>
        </Modal>
        <section className="add-company" onClick={() => { setIsModalOpen(true) }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
            </svg>
        </section>
        </>
    )
}

export default CreateCompany