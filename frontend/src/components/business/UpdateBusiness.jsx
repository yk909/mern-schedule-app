import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { updateBusiness, deleteBusiness } from '../../features/business/businessSlice';
import { Modal } from '../';


const UpdateBusiness = ({ business }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [updatedBusiness, setUpdatedBusiness] = useState(business);
    const dispatch = useDispatch();

    const onChange = (e) => {
        setUpdatedBusiness({
            ...updatedBusiness,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = () => {
        if(updatedBusiness.name && updatedBusiness.address && updatedBusiness.city && updatedBusiness.state && updatedBusiness.zip && updatedBusiness.type) {
            dispatch(updateBusiness(updatedBusiness));
            setIsModalOpen(false);
        } else {
            toast.error('Please fill out all fields');
        }
    }

    const onSubmitDelete = () => {
        dispatch(deleteBusiness(updatedBusiness._id));
        setIsModalOpen(false);
        setIsDeleteModalOpen(false);
    }

    return (
        <>
        <Modal
            setModalIsOpen={setIsModalOpen}
            modalIsOpen={isModalOpen}
            actionBtnText="Update"
            contentLabel={`Update ${business.name}`}
            onSubmit={onSubmit}
            actionDangerBtnText="Delete"
            onSubmitDanger={() => setIsDeleteModalOpen(true)}
        > 
            <div className="form-group-row">
                <div className="form-group">
                    <label>Name *</label>
                    <input
                        type="text"
                        placeholder="Name of business"
                        name="name"
                        value={updatedBusiness.name}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label>Type *</label>
                    <input
                        type="text"
                        placeholder="Type of business"
                        name="type"
                        value={updatedBusiness.type}
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
                        value={updatedBusiness.address}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label>City *</label>
                    <input
                        type="text"
                        placeholder="City"
                        name="city"
                        value={updatedBusiness.city}
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
                        value={updatedBusiness.state}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label>Zip *</label>
                    <input
                        type="text"
                        placeholder="Zip code"
                        name="zip"
                        value={updatedBusiness.zip}
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
                        value={updatedBusiness.phoneNumber}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label>Work Hours</label>
                    <input
                        type="text"
                        placeholder="07:00 - 17:00"
                        name="workHours"
                        value={updatedBusiness.workHours}
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
                    value={updatedBusiness.positions.join(', ')}
                    onChange={(e) => {
                        setUpdatedBusiness({
                            ...updatedBusiness,
                            positions: e.target.value.split(', ')
                        })}
                    }
                />
            </div>
        </Modal>
        <Modal
            setModalIsOpen={setIsDeleteModalOpen}
            modalIsOpen={isDeleteModalOpen}
            contentLabel={`Are you sure, you want to delete ${business.name}?`}
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
                    >Delete</div>
                </div>
            </div>
        </Modal>
        <div 
            className="btn-icon"
            onClick={() => setIsModalOpen(true)}
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
            </svg>
        </div>
        </>
    )
}

export default UpdateBusiness