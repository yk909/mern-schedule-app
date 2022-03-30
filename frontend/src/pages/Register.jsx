import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';
import './styles/Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password1: '',
        password2: ''
    });

    const { email, firstName, lastName, password1, password2 } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, msg } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(msg);
        }

        if (isSuccess || user) {
            navigate('/');
        }

        dispatch(reset());
    }, [user, isError, isSuccess, msg, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (email === '' || password1 === '' || password2 === '' || firstName === '' || lastName === '') {
            toast.error('Please fill out all fields');
        } else if (password1 !== password2) {
            toast.error('Passwords do not match');
        } else {
            const userData = {
                email,
                firstName,
                lastName,
                password: password1
            };

            dispatch(register(userData));
        }
    };


    return (
        <main>
            <div className="login-container">
                <div className="login-form">
                    <h1 className="title-2 text-center">Login</h1>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                placeholder="Enter your first name"
                                value={firstName}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                placeholder="Enter your last name"
                                value={lastName}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password1">Password</label>
                            <input
                                type="password"
                                name="password1"
                                id="password1"
                                placeholder="Enter your password"
                                value={password1}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password2">Confirm Password</label>
                            <input
                                type="password"
                                name="password2"
                                id="password2"
                                placeholder="Confirm your Password"
                                value={password2}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Register
                        </button>
                    </form>
                    <p className="mt-1 text-end">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </main>
    )
}

export default Register