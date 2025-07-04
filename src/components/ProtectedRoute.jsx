import React from 'react'
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({children}) => {
    const storedUser = localStorage.getItem('user');
   //  const user = useSelector((store) => store.user);
   if(!storedUser) {
    return <Navigate to='/login' replace />
   }
   return children
};

export default ProtectedRoute;