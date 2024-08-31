import { useState } from 'react';
import UserManagement from './UserManagement';

const AdminDashboard = ({ user }) => {
    return (
        <div className="p-4">
            <h1 className="text-3xl mb-6">Welcome, Admin</h1>
            <UserManagement />
        </div>
    );
};

export default AdminDashboard;
