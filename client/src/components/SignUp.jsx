import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../constants/axios';
import { useDispatch } from 'react-redux';
import { userLogin } from '../Redux/user';

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    });

    const handleSignup = async () => {
        if (!name || !email || !password) {
            setError(true);
            return false;
        }
        instance
            .post('/register', { name, email, password })
            .then(({ data }) => {
                console.log(data);
                dispatch(userLogin(data.result));
                localStorage.setItem('user', JSON.stringify(data.result));
                localStorage.setItem('token', JSON.stringify(data.auth));
                navigate('/');
            })
            .catch((err) => {
                alert(err);
            });
    };

    return (
        <div className="register">
            <h1>Register</h1>
            <input
                className="inputBox"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter Name"
            />
            {error && !name && <span className="errorSpan">Enter valid name</span>}
            <input
                className="inputBox"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter Email"
            />
            {error && !email && <span className="errorSpan">Enter valid email</span>}
            <input
                className="inputBox"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter password"
            />
            {error && !password && <span className="errorSpan">Enter valid password</span>}
            <button className="signupButton" onClick={handleSignup} type="button">
                Sign Up
            </button>
        </div>
    );
}

export default SignUp;
