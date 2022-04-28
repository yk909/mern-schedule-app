import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createBusiness } from '../../features/business/businessSlice';
import { Modal } from '../';
import { briefcaseIcon } from '../../constance/icons';

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
        workHours: '',
        positions: [],
        companyId: company._id
    });

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    const onSubmit = () => {
        if(business.name && business.type && business.address && business.city && business.state && business.zip) {
            if (user) {
                dispatch(createBusiness(business));
                setBusiness({
                    name: '',
                    type: '',
                    address: '',
                    city: '',
                    state: '',
                    zip: '',
                    phoneNumber: '',
                    workHours: '',
                    positions: [],
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
            <div className="form-group-row">
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
                    <label>Work Hours</label>
                    <input
                        type="text"
                        placeholder="07:00 - 17:00"
                        name="workHours"
                        value={business.workHours}
                        onChange={onChange}
                    />
                </div>
            </div>
            <div className="form-group">
                <label>Position</label>
                <input
                    type="text"
                    placeholder="Enter comma separated positions (e.g. CEO, Manager, Barista, etc.)"
                    name="position"
                    value={business.positions?.join(', ')}
                    onChange={(e) => {
                        setBusiness({
                            ...business,
                            positions: e.target.value.split(', ')
                        })}
                    }
                />
            </div>
        </Modal>
        <section className="btn btn-outline" onClick={() => { setIsModalOpen(true) }}>
            {briefcaseIcon}
            <span>Add Business</span>
        </section>
        </>
    )
}

export default CreateBusiness