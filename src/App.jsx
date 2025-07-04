import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter,Navigate,Route,Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Signup from './components/Signup'
import Profile from './components/Profile'
import Body from './components/Body'
import { Provider } from 'react-redux'
import store from './utils/appStore'
import ForgotPassword from './components/ForgotPassword'
import AdminDashboard from './components/AdminDashboard'
import PublicRoute from './components/PublicRoute'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'


function App() {

  return (
    <>
    <Provider store={store}>
     <BrowserRouter basename='/'>
     <Routes>
      <Route path='/' element={<Body/>}>
      <Route index element={<PublicRoute><Login /></PublicRoute>} />
      
      {/*Public Routes: If user is logged in, will redirect */}
      <Route path='/login' element={<PublicRoute><Login/></PublicRoute>} /> 
      <Route path='/forgotpassword' element={<PublicRoute><ForgotPassword/></PublicRoute>} />
      <Route path='/signup' element={<PublicRoute><Signup/></PublicRoute>} />

      {/*Protected Routes: These require the user to be logged in */}
      <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />

      {/*Admin Route: Only accessible for Admin else will redirect */}
      <Route path='/overview' element={<AdminRoute><AdminDashboard /></AdminRoute>} />

      {/* Catch-all Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
      

      </Route>
     </Routes>
     </BrowserRouter>
     </Provider>
    </>
  )
}

export default App
