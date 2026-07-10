import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const getStoredAuth = () => {
    if (typeof window === 'undefined') {
        return { token: null, user: null };
    }

    const token = window.localStorage.getItem('accessToken') || window.localStorage.getItem('token');
    const storedUser = window.localStorage.getItem('user');

    let user = null;
    if (storedUser) {
        try {
            user = JSON.parse(storedUser);
        } catch {
            user = null;
        }
    }

    return { token, user };
};

const ProtectedRoute = ({ allowedRoles, children }) => {
    const location = useLocation();
    const { token, user } = getStoredAuth();

    if (!token || !user) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    const role = user.role?.toLowerCase();
    if (!allowedRoles.includes(role)) {
        if (role === 'owner') {
            return <Navigate to="/owner" replace />;
        }

        if (role === 'tenant') {
            return <Navigate to="/tenant" replace />;
        }

        return <Navigate to="/auth" replace />;
    }

    return children;
};

export default ProtectedRoute;
