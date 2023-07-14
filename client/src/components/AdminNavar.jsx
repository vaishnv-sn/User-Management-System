import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AdminNavar() {
    const navigate = useNavigate();
    const auth = localStorage.getItem('admin');

    const handleLogout = () => {
        localStorage.removeItem('admin');
        localStorage.removeItem('adminToken');
        navigate('/admin/');
    };

    return (
        <>
            <div>
                {
                    auth && (
                        <ul className="navbar-ul">
                            <li>
                                <Link to={'/admin/home'}>Home</Link>
                            </li>
                            <li>
                                <Link to={'/admin/add-user'}>Add User</Link>
                            </li>
                            <li>
                                <Link onClick={handleLogout} to={'/admin'}>
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    ) /* : (
                    <ul className="navbar-ul navbar-right">
                        <li>
                            <Link to={'/signup'}>SignUp</Link>
                        </li>
                        <li>
                            <Link to={'/login'}>Login</Link>
                        </li>
                    </ul>
                ) */
                }
            </div>
        </>
    );
}

export default AdminNavar;
