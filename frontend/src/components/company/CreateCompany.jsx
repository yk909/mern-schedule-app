import { useEffect, useState } from 'react';
import { Modal } from '../';
import './styles/CreateCompany.css';

const CreateCompany = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isFindModalOpen, setIsFindModalOpen] = useState(false);

    return (
        <>
        <Modal
        setModalIsOpen={setIsCreateModalOpen}
        modalIsOpen={isCreateModalOpen}
        actionBtnText="Create"
        contentLabel={'Create Company'}
        >
            <div className="create-company-modal">
                <h2>Create Company</h2>
            </div>
        </Modal>
        <Modal
        setModalIsOpen={setIsCreateModalOpen}
        modalIsOpen={isCreateModalOpen}
        actionBtnText="Create"
        contentLabel={'Create Company'}
        >
            <div className="find-company-modal">
                <h2>Find Company</h2>
            </div>
        </Modal>
        <section className="add-company">
            <div className="create-company">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                </svg>
            </div>
            <div className="find-company">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
            </div>
        </section>
        </>
    )
}

export default CreateCompany