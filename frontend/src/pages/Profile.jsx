import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editUser } from '../features/auth/authSlice';
import './styles/Profile.css';

const Profile = () => {
    const { company } = useSelector(state => state.company);
    const { userEmployees } = useSelector(state => state.employee);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber ? user.phoneNumber : '');
    const [showNameInput, setShowNameInput] = useState(false);
    const [showLastNameInput, setShowLastNameInput] = useState(false);
    const [showPhoneNumberInput, setShowPhoneNumberInput] = useState(false);

    return (
        <section className="profile-page">
            {user && company && (
            <div className="profile-container flex">
                <div className="profile-img">
                    <img src={user.profilePicture ? user.profilePicture : '	https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'} alt="profile" />
                </div>
                <div className="profile-info w-100">
                    <div className="mb-1">
                        <div className="profile-name flex">
                            {!showNameInput ? (
                                <h1 className="title-2 mr-1" onClick={() => setShowNameInput(true)}>{user.firstName}</h1>
                            ) : (
                                <>
                                    <input 
                                        type="text"
                                        value={firstName}
                                        name="firstName"
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="Enter your first name"
                                    />
                                </>
                            )}
                            {!showLastNameInput ? (
                                <h1 className="title-2" onClick={() => setShowLastNameInput(true)}>{user.lastName}</h1>
                            ) : (
                                <>
                                    <input 
                                        type="text"
                                        value={lastName}
                                        name="lastName"
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Enter your first name"
                                    />
                                </>
                            )}
                        </div>
                        <h3 className="title-3 text-secondary">{user.email}</h3>
                        {!showPhoneNumberInput ? (
                            <p className="mt-1" onClick={() => setShowPhoneNumberInput(true)}>{user.phoneNumber ? `Phone: ${user.phoneNumber}` : 'Add phone number'}</p>
                        ) : (
                            <>
                                <input 
                                    type="text"
                                    value={phoneNumber}
                                    className="mt-1"
                                    name="phoneNumber"
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="Enter your phone number"
                                />
                            </>
                        )}
                        {(showNameInput || showLastNameInput || showPhoneNumberInput) && (
                        <div className="flex flex-end">
                            <div
                            className="btn btn-outline mr-1"
                            onClick={() => {
                                setFirstName(user.firstName);
                                setLastName(user.lastName);
                                setPhoneNumber(user.phoneNumber);
                                setShowNameInput(false);
                                setShowLastNameInput(false);
                                setShowPhoneNumberInput(false);
                            }}>
                                Cancel
                            </div>
                            <div 
                                className="btn btn-primary"
                                onClick={() => {
                                    dispatch(editUser({
                                        firstName,
                                        lastName,
                                        phoneNumber
                                    }));
                                    setShowNameInput(false);
                                    setShowLastNameInput(false);
                                    setShowPhoneNumberInput(false);
                                }}
                            >
                                Save
                            </div>
                        </div>
                        )}
                    </div>
                    <div className="user-info">
                        <div className="user-info-item">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"></path><path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z"></path></svg>
                            <div>
                                <p className="text-secondary">
                                    Company
                                </p>
                                <div className="mt-4">
                                    {company.name}
                                </div>
                            </div>
                        </div>
                        <div className="user-info-item">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z"></path></svg>
                            <div>
                                <p className="text-secondary">
                                    Businesses
                                </p>
                                {userEmployees?.length > 0 ? (
                                    <div className="mt-4">
                                        {userEmployees.map((employee, index) => (
                                            <p key={index}>{employee.business.name}</p>
                                        ))}
                                    </div>
                                ) : (
                                    <p>No businesses</p>
                                )}
                            </div>
                        </div>
                        <div className="user-info-item">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z"></path></svg>
                            <div>
                                <p className="text-secondary">
                                    Manager Of Businesses
                                </p>
                                {userEmployees?.length > 0 ? (
                                    <div className="mt-4">
                                        {userEmployees.map((employee, index) => (
                                            employee.isManager && 
                                            <p key={index}>{employee.business.name}</p>
                                        ))}
                                    </div>
                                ) : (
                                    <p>No businesses</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </section>
    )
}

export default Profile