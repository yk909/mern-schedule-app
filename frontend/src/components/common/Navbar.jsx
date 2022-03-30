import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './styles/Navbar.css';
import { logout, reset } from '../../features/auth/authSlice';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }

    return (
        <nav>
            <div className="nav-wrapper container">
                <div className="nav-left">
                    <ul>
                        <li>
                            <Link className="link" to="/">Schedule</Link>
                        </li>
                    </ul>
                </div>
                <div className="nav-right">
                    <ul>
                        {user ? (
                        <>
                            <li>
                                <Link className="link" to={`/${user.firstName}`}>
                                    {user.firstName}
                                </Link>
                            </li>
                            <li>
                                <button 
                                    className="btn"
                                    onClick={onLogout}
                                >Logout</button>
                            </li>
                        </>
                        ) : (
                        <>
                            <li>
                                <Link className="btn" to="/login">Login</Link>
                            </li>
                            <li>
                                <Link className="btn btn-primary" to="/register">Register</Link>
                            </li>
                        </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar