import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../constants/axios';
import { userLogin } from '../Redux/user';
import { useDispatch } from 'react-redux';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    });

    const handleLogin = () => {
        instance
            .post('/login', { email, password })
            .then(({ data }) => {
                dispatch(userLogin(data.userSecure));
                localStorage.setItem('user', JSON.stringify(data.userSecure));
                localStorage.setItem('token', JSON.stringify(data.auth));
                navigate('/');
            })
            .catch(({ response }) => {
                alert(response.data.error);
            });
    };

    return (
        <div className="login">
            <h1>Login</h1>
            <input
                type="email"
                className="inputBox"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

export default Login;
