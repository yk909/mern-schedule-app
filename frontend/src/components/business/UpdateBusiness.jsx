import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { updateBusiness, deleteBusiness } from '../../features/business/businessSlice';
import { editIcon } from '../../constance/icons';
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
            {editIcon}
        </div>
        </>
    )
}

export default UpdateBusiness