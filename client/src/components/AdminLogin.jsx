import React, { useState } from 'react';
import instance from '../constants/axios';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const [adminName, setAdminName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        instance
            .post('/adminLogin', { adminName, password })
            .then(({ data }) => {
                localStorage.setItem('admin', data.adminName);
                localStorage.setItem('adminToken', data.auth);
                navigate('/admin/home');
            })
            .catch(({ response }) => {
                alert(response.data.error);
            });
    };

    return (
        <div className="login">
            <h1>Admin Authentication</h1>
            <input
                type="email"
                className="inputBox"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                placeholder="Enter Email"
            />
            <input
                type="password"
                className="inputBox"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
            />
            <button className="signupButton" onClick={handleLogin} type="button">
                Login
            </button>
        </div>
    );
}

export default AdminLogin;
