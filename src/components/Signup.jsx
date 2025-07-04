import axios from 'axios';
import React, { use, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';
const BASE_URL = import.meta.env.VITE_API_URL;

const Signup = () => {

 const [phone_num,setPhoneNum] = useState("");
 const [password,setPassword] = useState("");
 const [name,setName] = useState("");
 const [district,setDistrict] = useState("");
 const [city,setCity] = useState("");
 const [pincode,setPincode] = useState("");
 const [star,setStar] = useState("");
 const [rashi,setRashi] = useState("");
 const [gothram,setGothram] = useState("");
 const [gender,setGender] = useState(null);
 const [error,setError] = useState("");
 const dispatch = useDispatch();
 const navigate = useNavigate();


 const handleSignup = async () => {
    try {
        const res = await axios.post(BASE_URL + "/signup",{
            phone_num,password,name,district,city,pincode,star,rashi,gothram,gender
        },{
            withCredentials: true
        });
        // console.log("Signup response data:", res.data);
        dispatch(addUser(res.data));
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/dashboard");
    }  catch (err) {
        setError(err?.response?.data?.error || "Something went Wrong");
        console.error(err);
    }
 }




  return (
    <>
    <div className='flex justify-center items-center min-h-screen p-4'>
    <div className="card bg-white w-full md:w-[800px] shadow-xl">
  <div className="card-body">
  <h5 className='text-center font-bold text-3xl mb-2'>Register</h5>
  <div className='text-end'><span className='text-red-500 pe-2 text-xl'>&#42; Mandatory Fields</span></div>
  <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-4'>
    <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Phone Number / ఫోన్ నంబర్<span className='text-red-500 ps-2 text-xl'>&#42;</span></span>
  </div>
  <input type="text" placeholder="Type here" maxLength={10} value={phone_num} onChange={(e) => setPhoneNum(e.target.value)} className="input input-bordered w-full max-w-xs" />
  </label>
  <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Password / పాస్‌వర్డ్<span className='text-red-500 ps-2 text-xl'>&#42;</span></span>
  </div>
  <input type="password" placeholder="Type here" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-bordered w-full max-w-xs" />
  </label>
  <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Name / పేరు<span className='text-red-500 ps-2 text-xl'>&#42;</span></span>
  </div>
  <input type="text" placeholder="Type here" value={name} onChange={(e) => setName(e.target.value)} className="input input-bordered w-full max-w-xs" />
  </label>
  <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Gender / లింగం</span>
  </div>
  <div className="form-control">
  <label className="label cursor-pointer">
    <span className="label-text">Male</span>
    <input type="radio"
                      name="gender"
                      value="M"
                      className="radio"
                      onChange={(e) => setGender(e.target.value)}
                      checked={gender === "M"} />
  </label>
</div>
<div className="form-control">
  <label className="label cursor-pointer">
    <span className="label-text">Female</span>
    <input  type="radio"
                      name="gender"
                      value="F"
                      className="radio"
                      onChange={(e) => setGender(e.target.value)}
                      checked={gender === "F"} />
  </label>
</div>

  </label>
  
  <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">District / జిల్లా</span>
  </div>
  <input type="text" placeholder="Type here" value={district} onChange={(e) => setDistrict(e.target.value)} className="input input-bordered w-full max-w-xs" />
  </label>
  <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">City / నగరం</span>
  </div>
  <input type="text" placeholder="Type here" value={city} onChange={(e) => setCity(e.target.value)} className="input input-bordered w-full max-w-xs" />
  </label>
  <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Pincode / పిన్కోడ్</span>
  </div>
  <input type="text" placeholder="Type here" value={pincode} onChange={(e) => setPincode(e.target.value)} className="input input-bordered w-full max-w-xs" />
  </label>
 

  
  <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Star / నక్షత్రం</span>
  </div>
  <input type="text" placeholder="Type here" value={star} onChange={(e) => setStar(e.target.value)} className="input input-bordered w-full max-w-xs" />
  </label>
  <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Rashi / రాశి</span>
  </div>
  <input type="text" placeholder="Type here" value={rashi} onChange={(e) => setRashi(e.target.value)} className="input input-bordered w-full max-w-xs" />
  </label>
  <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Gothram / గోత్రం</span>
  </div>
  <input type="text" placeholder="Type here" value={gothram} onChange={(e) => setGothram(e.target.value)} className="input input-bordered w-full max-w-xs" />
  </label>
  </div>
  {error && (<p className='text-red-500 my-2 text-center'>{error}</p>)}
    <div className="card-actions justify-center mt-3">
      <button className="btn btn-primary w-full text-lg" onClick={handleSignup}>Register</button>
      <Link to="/login" className="text-blue-500 mt-3">If already a User, Click here to Login</Link>
    </div>
  
    </div>
    </div>
    </div>
    </>
  )
}

export default Signup