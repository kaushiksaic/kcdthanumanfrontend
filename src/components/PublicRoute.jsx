import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
   const storedUser = localStorage.getItem('user');
  //  const user = useSelector((store) => store.user);
  if (storedUser) {
     const user = JSON.parse(storedUser);
    // If the user is logged in, redirect them based on their usertype.
    if (user.usertype === 'admin') {
      return <Navigate to="/overview" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }
  // If no user is logged in, render the children (e.g., Login or Signup page)
  return children;
};

export default PublicRoute;
