import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setDashboardData, updateCount } from '../utils/dashboardSlice';
import store from '../utils/appStore';
import { addUser } from '../utils/userSlice';
const BASE_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {

const [increment_by,setIncrement] = useState("0");
const [increment_tarpanam,setIncrementTarpanam] = useState('0');
const [error,setError] = useState("")
const dispatch = useDispatch();
const {name,count, target_count,status,pinnum,updatedat,tarpanam_count} = useSelector((store) => {
    // console.log("Full store:", store); // See the entire store
// console.log("Dashboard slice:", store.dashboard); // See just the dashboard slice
  return store.dashboard})
  // const { userid, usertype } = useSelector((store) => store.user);
  //  const userid = useSelector((store) => store.user.userid);
  const user = JSON.parse(localStorage.getItem("user") || "null");
const userid = user?.userid;
const usertype = user?.usertype;



useEffect(() => {
    const handleFetch = async () => {
        try {
            const res =  await axios.get(BASE_URL + "/japa/event",{
              headers: {
                "x-userid": userid,
                "x-usertype": usertype
              },withCredentials:true})
            // console.log("API Response :",res.data)
            dispatch(setDashboardData(res?.data));
            // console.log("After dispatch")
        } catch (err) {
            setError(err?.response?.data?.error || "Something went wrong");
            console.error(err);
        }
    }
    handleFetch();
},[dispatch,userid,usertype]);


const handleUpdateCount = async () => {
     if(!increment_by || isNaN(Number(increment_by)) ||
     !increment_tarpanam || isNaN(Number(increment_tarpanam))) {
        alert("Please enter a number");
     }
      try {
        const resp = await axios.patch(BASE_URL + "/japa/count",{increment_by: Number(increment_by),increment_tarpanam: Number(increment_tarpanam)},{headers: {
          "x-userid": userid,
          "x-usertype": usertype
        },withCredentials:true})
        dispatch(updateCount(resp?.data));
        setIncrement("0");
        setIncrementTarpanam("0");
      } catch (err) {
        setError(err?.response?.data?.error || "Failed to Update Count");
        console.error(err);
      }
}


const formatIST = (utcDateString) => {
  if (!utcDateString) return "N/A";
  const date = new Date(utcDateString);
  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};




  return (
    <>
    <div className='flex justify-center'>
    <div className="card bg-base-100 w-full md:w-[650px] shadow-xl my-3">
  <div className="card-body">
    <h2 className="text-center text-3xl font-semibold mb-4">Dashboard</h2>
    {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}
     <h3 className='font-bold text-lg text-center'>Welcome, {name}</h3>
     <p className='text-center my-0'>(Your 6 digit PIN Number is: <span className='font-bold'>{pinnum}</span> )</p>     
    <div className='grid grid-cols-2 gap-2 mt-2'>
        <span className='font-medium'>Event Name / ఈవెంట్ పేరు:</span>
        <span className='font-bold'>Shata Koti Hanuman Chalisa Parayanam</span>
        
        
            <span className='font-medium'>Daily Target Count / దినసరి లక్ష్య గణన:</span>
            <span className='font-bold'>{target_count || 'N/A'}</span>
        
        
            <span className='font-medium'>Parayanam Count / పారాయణం గణన:</span>
            <span className='font-bold'>{count || '0'}</span>

             
        
        
            <span className='font-medium'>Status / స్థితి:</span>
            <span className={`font-bold ${status === 'Completed' ? "text-green-500" : "text-red-500"}`}>{status || 'N/A'}</span>
        
            
    </div>
    <div className='text-center'>
    <span className='font-medium'>(As on {formatIST(updatedat)})</span>
    </div>

<div className='grid'>
<label className="form-control w-full max-w-xs mx-auto my-2">
  <div className="label">
    <span className="label-text text-lg">Parayanam Count</span>
  </div>
  <input type="text" placeholder="Type here" value={increment_by} onChange={(e) => setIncrement(e.target.value)} className="input input-bordered w-full max-w-xs" />
  </label>
  {/* <label className="form-control w-full max-w-xs mx-auto my-2">
  <div className="label">
    <span className="label-text text-lg">Tarpanam Count</span>
  </div>
  <input type="text" placeholder="Type here" value={increment_tarpanam} onChange={(e) => setIncrementTarpanam(e.target.value)} className="input input-bordered w-full max-w-xs" />
  </label> */}
</div>
  


    <div className="card-actions justify-center">
      <button className="btn btn-primary w-full" onClick={handleUpdateCount}>Add Count</button>
    </div>
  </div>
</div>
    </div>
    </>
  )
}

export default Dashboard