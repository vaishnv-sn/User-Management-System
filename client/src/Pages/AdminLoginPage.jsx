import React, { useEffect } from 'react';
import AdminNavar from '../components/AdminNavar';
import AdminLogin from '../components/AdminLogin';
import { useNavigate } from 'react-router-dom';

function AdminLoginPage() {
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('admin');
        if (auth) {
            navigate('/admin/home');
        }
    });
    return (
        <>
            <AdminNavar />
            <AdminLogin />
        </>
    );
}

export default AdminLoginPage;
