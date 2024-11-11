import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";

import {getBrand,deleteBrand} from "../../../Store/ActionCreators/BrandActionCreators"
import { useDispatch, useSelector } from "react-redux";


export default function AdminBrand() {
  let [data, setData] = useState([])
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "pic", headerName: "Pic", width: 200 ,renderCell:({row})=> <a href={`${row.pic}`} target='_blank' >
      <img src={`${row.pic}`} height={50} width={50} className="rounded" alt="" />
    </a>},
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "active",
      headerName: "Active",
      width: 100,
      renderCell: ({row}) => 
        <p className={row.active ? "text-success" : "text-danger"}>
          {row.active ? "Yes" : "No"}
        </p>
      
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (row) => (
        <Link
          to={`/admin/brand/update/${row.id} `}
          className="btn btn-primary"
        >
          <i className="fa fa-edit"></i>
        </Link>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: (row) => (
        <button className="btn btn-danger" onClick={() => deleteData(row.id)}>
          <i className="fa fa-trash"></i>
        </button>
      ),
    },
  ]
  let BrandStateData= useSelector((state)=>state.BrandStateData)
    let dispatch = useDispatch();

  //data get karne ke liye

   function deleteData(id) {
    if (window.confirm("Are You Sure to Delete that Item: ")) {
      // let response=await fetch("http://localhost:8000/brand/"+id,{
      //   method:"DELETE",
      //   headers:{
      //     "content-type":"application/json"
      //   },
      //   body:JSON.stringify({...data})
      // })
      // response=await response.json()
      dispatch(getBrand())
      if (BrandStateData.length)
        setData(BrandStateData);
      // setData(response)
      dispatch(deleteBrand({ id: id }));
    
  
      getAPIData();
    }
  }

 function getAPIData() {
    // let response= await fetch("http://localhost:8000/Brand",{
    //   method:"GET",
    //   headers:{
    //     "content-type":"application/json"
    //   },
    //   // body:JSON.stringify({...data})
    // })
    // response=await response.json()
    dispatch(getBrand())
    if (BrandStateData.length)
      setData(BrandStateData);
    // setData(response)
    else
     setData([]);
  }

  useEffect(() => {
    getAPIData();
  }, [BrandStateData.length]);
  // useEffect(() => {
  //   getAPIData()
  // },[])
   return(
    <>
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-md-3">
            <Sidebar />
          </div>

          <div className="col-md-9">
            <h5 className="bg-primary p-2 text-center text-light">
              Brand
              <Link to="/admin/brand/create">
                <i className="fa fa-plus text-light float-end"></i>
              </Link>
            </h5>
            <div className="table-responsive">
              <div style={{height: 400, width:'100%'}}>
                <DataGrid
                  rows={data}
                  columns={columns}
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
  );
}
