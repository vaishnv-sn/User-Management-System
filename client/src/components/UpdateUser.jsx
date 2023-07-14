import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import instance from '../constants/axios';

function UpdateUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    const getUserDetails = () => {
        const adminToken = localStorage.getItem('adminToken');
        instance
            .get(`/getUserDetails/${params.id}`, { headers: { Authorization: `Bearer ${adminToken}` } })
            .then(({ data }) => {
                setName(data.name);
                setEmail(data.email);
                setPassword(data.password);
            });
    };

    const updateUser = async () => {
        const adminToken = localStorage.getItem('adminToken');
        instance
            .put(
                `/userUpdate/${params.id}`,
                { name, email, password },
                { headers: { Authorization: `Bearer ${adminToken}` } }
            )
            .then(() => {
                navigate('/admin/home');
                alert('Successfully updated');
            })
            .catch((err) => {
                alert(err);
            });
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <div className="product">
            <h1>Update User</h1>
            <input
                className="inputBox"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter Name"
            />
            <input
                className="inputBox"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter Email"
            />
            <input
                className="inputBox"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter password"
            />

            <button className="signupButton" onClick={() => updateUser()} type="button">
                Update User
            </button>
        </div>
    );
}

export default UpdateUser;
