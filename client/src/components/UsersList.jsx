import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import instance from '../constants/axios';
import { useNavigate } from 'react-router-dom';

function UsersList() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const getUsers = async () => {
        const adminToken = localStorage.getItem('adminToken');
        instance
            .get('/getUsers', {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            })
            .then((results) => {
                setUsers(results.data);
            })
            .catch(({ response }) => {
                localStorage.removeItem('admin');
                localStorage.removeItem('adminToken');
                alert(response.data.message);
                navigate('/admin');
            });
    };

    const deleteUser = (id) => {
        const adminToken = localStorage.getItem('adminToken');
        instance
            .delete(`/deleteUser/${id}`, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            })
            .then(() => {
                alert('User deleted successfully');
                getUsers();
            })
            .catch((err) => {
                alert('Something went wrong ' + err);
            });
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handleSearch = async (e) => {
        let key = e.target.value;
        const adminToken = localStorage.getItem('adminToken');
        if (key) {
            instance.get(`/search/${key}`, { headers: { Authorization: `Bearer ${adminToken}` } }).then(({ data }) => {
                setUsers(data);
            });
        } else {
            getUsers();
        }
    };

    return (
        <div className="usersTable">
            <h3>Users List</h3>
            <input type="text" className="search-user-box" placeholder="Search user.." onChange={(e) => handleSearch(e)} />
            {users.length ? (
                <table>
                    <tbody>
                        <tr>
                            <th>Index</th>
                            <th>Name</th>
                            {/* <th>Image</th> */}
                            <th>Email</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                        {users.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    {/* <td>
                        <img src="" alt="profile-img" />
                    </td> */}
                                    <td>{user.email}</td>
                                    <td>
                                        <button id="status-btn">
                                            <Link to={`/admin/update-user/${user._id}`}>Edit</Link>
                                        </button>
                                    </td>
                                    <td>
                                        <button id="delete-btn" onClick={() => deleteUser(user._id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <h3>No results found!</h3>
            )}
        </div>
    );
}

export default UsersList;
