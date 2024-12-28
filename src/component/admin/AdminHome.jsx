import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import Profile from "../Profile";
export default function AdminHome(props) {
  let [user,setUser]=useState()
  let navigate =useNavigate()
  useEffect(()=>{
      (async()=>{
let response = await fetch("/api/user/"+localStorage.getItem("userid"),{
  method:"get",
  headers:{
      "content-type":"application/json",
      "authorization":localStorage.getItem("token")
  }

})
response=await response.json()
if(response.result==="Done")
  setUser(response.data)
else
navigate("/login")
      })()
  },[])
  return (
    <>
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-md-3">
            <Sidebar />
          </div>
          
          <div className="col-md-9">
            <div className="row">
                <div className="col-md-6">
                {/* {
                    user.pic?
                    <img src={user.pic} height={450} width="100%" alt="User Image" />:
                    <img src="/img/noimage.png" height={450} width="100%"  alt="User Image" />
                } */}
                    <img src="/img/noimage.png" height={430} width="100%"  alt="User Image"/>

                </div>
                <div className="col-md-6">
                    <h5 className="bg-primary text-light text-center">Admin Profile</h5>
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <td>Parmanand</td>
                            </tr>
                            <tr>
                                <th>user Name</th>
                                <td>Param</td>
                            </tr>
                            <tr>
                                <th>Phone</th>
                                <td>9368394493</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>pjha3861@gmail.com</td>
                            </tr>
                             <tr>
                                
                                <td colSpan={2}><Link to="/update-profile" className="btn btn-primary w-100">Update Profile</Link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
          </div>
      </div>
      </div>
      {/* <Profile/> */}
    </>
  );
}
