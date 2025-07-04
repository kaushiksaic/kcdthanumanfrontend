import axios from 'axios';
import React, { useState } from 'react'
import {Link, useNavigate } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_API_URL;

const ForgotPassword = () => {
  const [phone_num,setPhoneNum] = useState("");
  const [password,setPassword] = useState("");
  const [pinnum,setPinNum] = useState("");
  const [error,setError] = useState("");
  const navigate = useNavigate();

const handleForgotPassword  =  async () => {
  try {

   const res = await axios.post(BASE_URL + "/forgotpassword",{phone_num,password,pinnum},{withCredentials:true});
   alert('Password Updated Successfully, Please Login!');
   navigate('/login');
  } catch(err) {
    setError(err?.response?.data?.error || 'Something went wrong')
    console.error(err);
  }
}

  return (
    <>
    <div className='flex justify-center'>
        <div className="card bg-white w-96 py-2 my-4">
      <div className="card-body">
        <h5 className='text-center font-bold text-3xl pb-2'>Forgot Password</h5>
      <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">Phone Number / ఫోన్ నంబర్</span>
      </div>
      <input type="text" placeholder="Type here" value={phone_num} onChange={(e) => setPhoneNum(e.target.value)} className="input input-bordered w-full max-w-xs" />
    </label>
    
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">New Password / కొత్త పాస్‌వర్డ్</span>
      </div>
      <form>
      <input type="password" placeholder="Type here" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-bordered w-full max-w-xs" />
      </form>
    </label>

    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">PIN Number / పిన్ నంబర్</span>
      </div>
      <input type="text" placeholder="Type here" value={pinnum} onChange={(e) => setPinNum(e.target.value)} className="input input-bordered w-full max-w-xs" />
    </label>
    {error && (<p className='text-red-500 my-2 text-center'>{error}</p>)}
    <button className='btn btn-primary mt-2' onClick={handleForgotPassword} >Submit</button>
    <Link to="/login" className='text-center mt-2 text-blue-500'>Back to Login</Link>
      </div>
      </div>
      </div>
    </>
  )
}

export default ForgotPassword