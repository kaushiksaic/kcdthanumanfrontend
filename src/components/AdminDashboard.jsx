import axios from 'axios'
import React, { useEffect, useState } from 'react'
const BASE_URL = import.meta.env.VITE_API_URL;
import { useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const AdminDashboard = () => {

 const [overviewData,setOverviewData] = useState([]);
 const [totalSum,setTotalSum] = useState('');
 const [filterText, setFilterText] = useState('');

//  const { userid, usertype } = useSelector((store) => store.user);
const user = JSON.parse(localStorage.getItem("user") || "null");
const userid = user?.userid;
const usertype = user?.usertype;

 useEffect(() => {
  const handleAdminFetch = async () => {
    try {
      const res =  await axios.get(BASE_URL + "/japa/overview",{headers: {
        "x-userid": userid,
        "x-usertype": usertype
      },withCredentials: true})
      // console.log("API Response :",res.data)
      if(res.data) {
        setOverviewData(res.data.overview);
        setTotalSum(res.data.sum);
      }
    } catch(err) {
     console.error(err);
    }
  }
  handleAdminFetch();
 
 },[])

 const exportToExcel = (data, filename = 'data.xlsx') => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(dataBlob, filename);
};

 const columns = [
  {
    name: 'UserID',
    selector: row => row.userid,
    sortable: true
  },
  {
    name: 'Mobile Number',
    selector: row => row.mobilenum,
    sortable: true
  },
  {
    name: 'Name',
    selector: row => row.name,
    sortable: true
  },
  {
    name: 'City',
    selector: row => row.city ? row.city : 'N/A',
    sortable: true
  },
  {
    name: 'Count',
    selector: row => row.count,
    sortable: true
  },
  {
    name: 'PIN Number',
    selector: row => row.pinnum,
    sortable: true
  }
 ]

 const filteredData = overviewData.filter(item =>
  (item.name && item.name.toLowerCase().includes(filterText.toLowerCase())) ||
  (item.city && item.city.toLowerCase().includes(filterText.toLowerCase())) ||
  (item.mobilenum && item.mobilenum.includes(filterText)) ||
  (item.pinnum && item.pinnum.toString().includes(filterText))
);



 





  return (
    <>
    <div className="card lg:card-side bg-base-100 shadow-xl mx-5 my-5">
  <div className="card-body">
     {/* <h2 className="card-title">Users Overview</h2>  */}
    <div className='flex flex-row justify-between items-center'>
      <label className="input input-bordered flex items-center gap-2">
  <input type="text" className="grow" placeholder="Search by Name, City, Mobile, or PIN"  value={filterText}
  onChange={e => setFilterText(e.target.value)} />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      fillRule="evenodd"
      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
      clipRule="evenodd" />
  </svg>
</label>
      {/* <input
  type="text"
  placeholder="Search by Name, City, Mobile, or PIN"
  className="input input-bordered mb-4"
  value={filterText}
  onChange={e => setFilterText(e.target.value)}
/> */}
<button className="btn btn-success" onClick={() => exportToExcel(filteredData)}>Export to Excel</button>
    </div>
    
 
    <div className="overflow-x-auto">
  {/* <table className="table table-xs">
    <thead>
      <tr>
        <th>UserID</th>
        <th>Mobile Number</th>
        <th>Name</th>
        <th>City</th>
        <th>Count</th>
        <th>PIN Number</th>
      </tr>
    </thead>
    <tbody>
      {overviewData.map((row) => (
        <tr key={row.userid}>
          <td>{row.userid}</td>
          <td>{row.mobilenum}</td>
          <td>{row.name}</td>
          <td>{row.city ? row.city : 'N/A'}</td>
          <td>{row.count}</td>
          <td>{row.pinnum}</td>
        </tr>
      ))}
    </tbody>
    
  </table> */}
  <DataTable
  title="Users Overview"
  columns={columns}
  data={filteredData}
  pagination
  highlightOnHover
  striped
  dense
/>
</div>
<h4 className='font-bold text-3xl mt-2'>Total Count : {totalSum}</h4>
  </div>
</div>
    </>
  )
}

export default AdminDashboard