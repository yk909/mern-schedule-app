import { useEffect, useState } from 'react';
import Select from 'react-select';
import { customSelectModalStyles, positions } from '../../constance/dummyData';
import { Modal } from '../';

const positionsSelect = positions.sort().map(position => {
    return {
        value: position,
        label: position
    }
});

const CreateBusiness = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [business, setBusiness] = useState({
        name: '',
        type: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        phoneNumber: '',
        positions: null,
    });

    return (
        <>
        <Modal
            setModalIsOpen={setIsModalOpen}
            modalIsOpen={isModalOpen}
            actionBtnText="Create"
            contentLabel={'Add Business'}
        > 
            <div className="form-group-row">
                <div className="form-group">
                    <label>Name *</label>
                    <input
                        type="text"
                        placeholder="Name of business"
                    />
                </div>
                <div className="form-group">
                    <label>Type *</label>
                    <input
                        type="text"
                        placeholder="Type of business"
                    />
                </div>
            </div>
            <div className="form-group-row">
                <div className="form-group">
                    <label>Address *</label>
                    <input
                        type="text"
                        placeholder="Address"
                    />
                </div>
                <div className="form-group">
                    <label>City *</label>
                    <input
                        type="text"
                        placeholder="City"
                    />
                </div>
            </div>
            <div className="form-group-row">
                <div className="form-group">
                    <label>State *</label>
                    <input
                        type="text"
                        placeholder="State"
                    />
                </div>
                <div className="form-group">
                    <label>Zip *</label>
                    <input
                        type="text"
                        placeholder="Zip code"
                    />
                </div>
            </div>
            <div className="form-group">
                <label>Phone Number</label>
                <input
                    type="text"
                    placeholder="Phone number"
                />
            </div>
            <div className="form-group">
                <label>Position</label>
                <Select
                    value={business.positions}
                    onChange={(e) => { setBusiness({ ...business, positions: e }) }}
                    options={positionsSelect}
                    styles={customSelectModalStyles}
                    isMulti={true}
                />
            </div>
        </Modal>
        <section className="btn btn-outline-primary" onClick={() => { setIsModalOpen(true) }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
            </svg>
            <span>Add Business</span>
        </section>
        </>
    )
}

export default CreateBusiness