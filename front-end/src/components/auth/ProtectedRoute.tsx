import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAppSelector } from '@/redux/hook';
import { toast } from 'react-toastify';

interface ProtectedRouteProps {
    element: React.ReactNode;
    path: string;
}

const ProtectedRoute = ({ element, path }: ProtectedRouteProps) => {
    const userToken = useAppSelector((state) => state.loginUser.token);
    console.log('userToken: ', userToken);

    const handleNotLoggedIn = () => {
        toast.error('You need to be logged in to access this page');
    }
    if (userToken) {
        return <Route path={path} element={element} />;
    } else {
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
