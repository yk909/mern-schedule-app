import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../';
import { createCompany } from '../../features/company/companySlice';
import './styles/CreateCompany.css';

const CreateCompany = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState({
        name: '',
        email: '',
        website: '',
    });

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    const onChange = (e) => {
        const { name, value } = e.target;
        setCompany({ ...company, [name]: value });
    };

    const onSubmit = (e) => {
        if(user && isNew) {
            dispatch(createCompany(
                {
                    company: company, 
                    token: user.token
                }
            ));
            setIsModalOpen(false);
        } else if ( user && !isNew ) {
            console.log('send email');
            setIsModalOpen(false);
        }
    };

    return (
        <>
        <Modal
            setModalIsOpen={setIsModalOpen}
            modalIsOpen={isModalOpen}
            actionBtnText={`${!isNew ? 'Apply' : 'Create'}`}
            contentLabel={'Add Company'}
            onSubmit={onSubmit}
        >
            <div className="nav-tab-select">
                <p className={`${!isNew ? 'selected' : ''}`} onClick={() => setIsNew(false)}>Apply By Email</p>
                <p className={`${isNew ? 'selected' : ''}`} onClick={() => setIsNew(true)}>Create New</p>
            </div>
            {!isNew ? (
                <div className="form-group">
                    <label>Email *</label>
                    <input 
                        type="email" 
                        placeholder="Company's email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
            ) : (
                <>
                <div className="form-group-row">
                    <div className="form-group">
                        <label>Name *</label>
                        <input 
                            type="text" 
                            placeholder="Company's name" 
                            value={company.name} 
                            name="name"
                            onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label>Email *</label>
                        <input 
                            type="text" 
                            placeholder="Company's email" 
                            value={company.email}
                            name="email"
                            onChange={onChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label>Website</label>
                    <input 
                        type="text" 
                        placeholder="Company's website" 
                        value={company.website}
                        name="website"
                        onChange={onChange} />
                </div>
                </>
            )}
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