import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminPrivateComponent = () => {
    const auth = localStorage.getItem('admin');
    return auth ? <Outlet /> : <Navigate to={'/admin'} />;
};

export default AdminPrivateComponent;
