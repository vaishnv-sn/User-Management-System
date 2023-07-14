import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../constants/axios';

function AddUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleNewUser = () => {
        console.log('clicked');
        if (!name || !email || !password) {
            setError(true);
            return false;
        }

        instance
            .post('/register', { name, email, password })
            .then(({ data }) => {
                alert(`${data.result.name} Added to users list`);
                navigate('/admin/home');
            })
            .catch(({ response }) => {
                alert(response.data.error);
            });
    };

    return (
        <div className="product">
            <h1>Add User</h1>
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

            <button className="signupButton" onClick={() => handleNewUser()} type="button">
                Add User
            </button>
        </div>
    );
}

export default AddUser;
