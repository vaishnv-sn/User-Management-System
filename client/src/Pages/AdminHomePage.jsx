import React from 'react';
import AdminNavar from '../components/AdminNavar';
import UsersList from '../components/UsersList';

function AdminHomePage() {
    return (
        <>
            <AdminNavar />
            <UsersList />
        </>
    );
}

export default AdminHomePage;
