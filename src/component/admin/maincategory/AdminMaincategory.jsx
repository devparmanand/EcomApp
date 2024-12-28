import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import { Link} from "react-router-dom";
import Sidebar from "../Sidebar";

import {getMaincategory,deleteMaincategory} from "../../../Store/ActionCreators/MaincategoryActionCreators"
import { useDispatch, useSelector } from "react-redux";


export default function AdminMaincategory() {
  let [data, setData] = useState([])
  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
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
      renderCell: ({row}) => (
        <Link
          to={`/admin/maincategory/update/${row._id} `}
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
      renderCell: ({row}) => (
        <button className="btn btn-danger" onClick={() => deleteData(row._id)}>
          <i className="fa fa-trash"></i>
        </button>
      ),
    },
  ]
  let MaincategoryStateData=useSelector((state)=>state.MaincategoryStateData)
    let dispatch = useDispatch();

  //data get karne ke liye

   function deleteData(_id) {
    if (window.confirm("Are You Sure to Delete that Item: ")) {
      // let response=await fetch("http://localhost:8000/maincategory/"+id,{
      //   method:"DELETE",
      //   headers:{
      //     "content-type":"application/json"
      //   },
      //   body:JSON.stringify({...data})
      // })
      // response=await response.json()
      dispatch(getMaincategory())
      if (MaincategoryStateData.length)
        setData(MaincategoryStateData);
      // setData(response)
      dispatch(deleteMaincategory({ _id: _id }));
    
  
      getAPIData();
    }
  }

 function getAPIData() {
    // let response= await fetch("http://localhost:8000/maincategory",{
    //   method:"GET",
    //   headers:{
    //     "content-type":"application/json"
    //   },
    //   // body:JSON.stringify({...data})
    // })
    // response=await response.json()
    dispatch(getMaincategory())
    if (MaincategoryStateData.length)
      setData(MaincategoryStateData);
    // setData(response)
    else
     setData([]);
  }

  useEffect(() => {
    getAPIData();
  }, [MaincategoryStateData.length]);
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
              Maincategorty
              <Link to="/admin/maincategory/create">
                <i className="fa fa-plus text-light float-end"></i>
              </Link>
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
  );
}
