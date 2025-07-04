import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';
const BASE_URL = import.meta.env.VITE_API_URL;

const Login = () => {

    const [phone_num, setPhoneNum] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();


    // useEffect(() => {
    //     // ✅ Auto-login if user is already in localStorage
    //     const storedUser = localStorage.getItem("user");
    //     if (storedUser) {
    //       dispatch(addUser(JSON.parse(storedUser))); // Set user in Redux
    //       navigate("/dashboard");
    //     }
    //     // const user = JSON.parse(storedUser);
    //     // if (user.usertype === 'admin') {
    //     //   navigate("/overview")
    //     // } else {
    //     //   navigate=("/dashboard")
    //     // }
    //   }, [dispatch, navigate]);


    const handleLogin = async () => {
        try {
            const res = await axios.post(BASE_URL + "/login",{
                phone_num,
                password
            },{
                withCredentials: true
            });
            // console.log("Login response data:", res.data);
            dispatch(addUser(res.data));
             localStorage.setItem("user", JSON.stringify(res.data));

            if(res.data.usertype === 'admin') {
              navigate("/overview")
            } else {
            navigate("/dashboard")
            }
        }  catch(err) {
            setError(err?.response?.data?.error || "Something went Wrong");
            console.error(err);
        }
    }



  return (
    <>
    <div className='flex justify-center'>
    <div className="card bg-white w-96 py-2 mt-4">
  <div className="card-body">
    <h5 className='text-center font-bold text-3xl pb-2'>Login</h5>
  <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Phone Number / ఫోన్ నంబర్</span>
  </div>
  <input type="text" placeholder="Type here" value={phone_num} onChange={(e) => setPhoneNum(e.target.value)} className="input input-bordered w-full max-w-xs" />
</label>

<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Password / పాస్‌వర్డ్</span>
  </div>
  <form>
  <input type="password" placeholder="Type here" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-bordered w-full max-w-xs" />
  </form>
</label>
<Link to="/forgotpassword" className='text-center mt-2 text-blue-500'>Forgot Password ?</Link>
{error && (<p className='text-red-500 my-2 text-center'>{error}</p>)}
<button className='btn btn-primary mt-2' onClick={handleLogin}>Login</button>
<Link to="/signup" className='text-center mt-2 text-blue-500'>If New User, Please Click Here to Register</Link>
  </div>
  </div>
  </div>
    </>
  )
}

export default Login