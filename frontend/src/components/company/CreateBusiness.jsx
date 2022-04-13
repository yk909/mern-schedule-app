import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { customSelectModalStyles, positions } from '../../constance/dummyData';
import { createBusiness } from '../../features/business/businessSlice';
import { Modal } from '../';

const positionsSelect = positions.sort().map(position => {
    return {
        value: position,
        label: position
    }
});

const CreateBusiness = ({ company }) => {
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
        companyId: company._id
    });

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    const onSubmit = () => {
        if(business.name && business.type && business.address && business.city && business.state && business.zip) {
            if (user) {
                dispatch(createBusiness({
                    business,
                    token: user.token
                }));
                setBusiness({
                    name: '',
                    type: '',
                    address: '',
                    city: '',
                    state: '',
                    zip: '',
                    phoneNumber: '',
                    positions: null,
                    companyId: company._id
                });
                setIsModalOpen(false);
            }
        } else {
            toast.error('Please fill out all fields');
        }
    }

    const onChange = (e) => {
        setBusiness({
            ...business,
            [e.target.name]: e.target.value
        });
    }

    return (
        <>
        <Modal
            setModalIsOpen={setIsModalOpen}
            modalIsOpen={isModalOpen}
            actionBtnText="Create"
            contentLabel={'Add Business to ' + company.name}
            onSubmit={onSubmit}
        > 
            <div className="form-group-row">
                <div className="form-group">
                    <label>Name *</label>
                    <input
                        type="text"
                        placeholder="Name of business"
                        name="name"
                        value={business.name}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label>Type *</label>
                    <input
                        type="text"
                        placeholder="Type of business"
                        name="type"
                        value={business.type}
                        onChange={onChange}
                    />
                </div>
            </div>
            <div className="form-group-row">
                <div className="form-group">
                    <label>Address *</label>
                    <input
                        type="text"
                        placeholder="Address"
                        name="address"
                        value={business.address}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label>City *</label>
                    <input
                        type="text"
                        placeholder="City"
                        name="city"
                        value={business.city}
                        onChange={onChange}
                    />
                </div>
            </div>
            <div className="form-group-row">
                <div className="form-group">
                    <label>State *</label>
                    <input
                        type="text"
                        placeholder="State"
                        name="state"
                        value={business.state}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label>Zip *</label>
                    <input
                        type="text"
                        placeholder="Zip code"
                        name="zip"
                        value={business.zip}
                        onChange={onChange}
                    />
                </div>
            </div>
            <div className="form-group">
                <label>Phone Number</label>
                <input
                    type="text"
                    placeholder="Phone number"
                    name="phoneNumber"
                    value={business.phoneNumber}
                    onChange={onChange}
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