import React from 'react'
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({children}) => {
   const storedUser = localStorage.getItem("user");
  // const user = useSelector((store) => store.user);
  if(!storedUser) {
    // console.log("No stored user");
    return <Navigate to='/login' replace />
  } 
  
   const user = JSON.parse(storedUser);
  // console.log("AdminRoute user:", user);
  if(user.usertype !== 'admin') {
    // console.log("User is not admin, redirecting to /dashboard");
   return <Navigate to='/dashboard' replace />
  } 
   
  return children;

}

export default AdminRoute