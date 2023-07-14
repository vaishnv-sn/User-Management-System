import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { resetState } from '../Redux/user';

function Navbar() {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        dispatch(resetState());
        navigate('/login');
    };

    return (
        <div>
            {auth ? (
                <ul className="navbar-ul">
                    <li>
                        <Link to={'/'}>Home</Link>
                    </li>
                    <li>
                        <Link to={'/profile'}>Profile</Link>
                    </li>
                    <li>
                        <Link onClick={handleLogout} to={'/login'}>
                            Logout
                        </Link>
                    </li>
                </ul>
            ) : (
                <ul className="navbar-ul navbar-right">
                    <li>
                        <Link to={'/signup'}>SignUp</Link>
                    </li>
                    <li>
                        <Link to={'/login'}>Login</Link>
                    </li>
                </ul>
            )}
        </div>
    );
}

export default Navbar;
