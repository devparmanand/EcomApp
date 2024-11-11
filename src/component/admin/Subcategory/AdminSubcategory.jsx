import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";

import {getSubcategory,deleteSubcategory} from "../../../Store/ActionCreators/SubcategoryActionCreators"
import { useDispatch, useSelector } from "react-redux";

// import {
//   getSubcategory,
//   deleteSubcategory,
// } from "../../../Store/ActionCreators/SubcategoryActionCreators";
export default function AdminSubcategory() {
  let [data, setData] = useState([])
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
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
          to={`/admin/subcategory/update/${row.id} `}
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
  let SubcategoryStateData=useSelector((state)=>state.SubcategoryStateData)
    let dispatch = useDispatch();

  //data get karne ke liye

   function deleteData(id) {
    if (window.confirm("Are You Sure to Delete that Item: ")) {
      // let response=await fetch("http://localhost:8000/subcategory/"+id,{
      //   method:"DELETE",
      //   headers:{
      //     "content-type":"application/json"
      //   },
      //   body:JSON.stringify({...data})
      // })
      // response=await response.json()
      dispatch(getSubcategory())
      if (SubcategoryStateData.length)
        setData(SubcategoryStateData);
      // setData(response)
      dispatch(deleteSubcategory({ id: id }));
    
  
      getAPIData();
    }
  }

 function getAPIData() {
    // let response= await fetch("http://localhost:8000/subcategory",{
    //   method:"GET",
    //   headers:{
    //     "content-type":"application/json"
    //   },
    //   // body:JSON.stringify({...data})
    // })
    // response=await response.json()
    dispatch(getSubcategory())
    if (SubcategoryStateData.length)
      setData(SubcategoryStateData);
    // setData(response)
    else
     setData([]);
  }

  useEffect(() => {
    getAPIData();
  }, [SubcategoryStateData.length]);
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
              Subcategory
              <Link to="/admin/subcategory/create">
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
