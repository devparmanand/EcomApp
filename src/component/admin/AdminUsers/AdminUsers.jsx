import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'

export default function AdminUsers() {
    let [data , setData]=useState([])
 const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 200 },
    { field: "username", headerName: "Username", width: 200 },
    { field: "role", headerName: "Role", width: 200 },
    // {
    //   field: "active",
    //   headerName: "Active",
    //   width: 100,
    //   renderCell: ({row}) => 
    //     <p className={row.active ? "text-success" : "text-danger"}>
    //       {row.active ? "Yes" : "No"}
    //     </p>
      
    // },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: ({row}) => (
        <button className="btn btn-danger" onClick={() => deleteData(row._id)}>
          <i className="fa fa-trash"></i>
        </button>
      ),
    },
  ]
    async function deleteData(_id) {
        if(window.confirm("Are sure to delete that Item")){
            let response = await fetch("/api/user/"+_id , {
                method:"DELETE",
                headers:{
                    "content-type":"application/json",
                     "authorization":localStorage.getItem("token")

                }
            })
            response= await response.json()
        getAPIData()
        }
        
    }

  async  function getAPIData() {
           let response = await fetch("/api/user",{
            method:"GET",
            headers:{
                "content-type":"application/json",
        "authorization":localStorage.getItem("token")

            },
           })
        response =await response.json()

        if(response.result === "Done"){
            setData(response.data)
        }
        else
        setData([])
    }

    useEffect(()=>{
        getAPIData()
    } , [])
  return (
  <>
  <div className="container-fluid">
                <div className="row my-3">
                     <div className="col-md-3">
                       <Sidebar/>
                     </div>
           
                     <div className="col-md-9">
                       <h5 className="bg-primary p-2 text-center text-light">
                         Users
                       </h5>
                       <div className="table-responsive">
                         <div style={{height: 400, width:'100%'}}>
                           <DataGrid
                             rows={data}
                             columns={columns}
                             getRowId={(row)=>row._id}
                             initialState={{
                               pagination: {
                                 paginationModel: { page: 0, pageSize: 5 },
                               },
                             }}
                             pageSizeOptions={[5, 10, 20, 50, 100]}
                             checkboxSelection={false}
                           />
                         </div>
                       </div>
                     </div>
                   </div>
  </div>
  </>
  )
}
