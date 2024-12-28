import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import {getTestimonial,deleteTestimonial} from "../../../Store/ActionCreators/TestimonialActionCreators"
import { useDispatch, useSelector } from "react-redux";


export default function AdminTestimonial() {
  let [data, setData] = useState([])
  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "name", headerName: "Name", width: 200 },
 { field: "pic", headerName: "Pic", width: 200 ,
 renderCell:({row})=> <a href={`/${row.pic}`} target='_blank' rel="noreferrer" >
      <img src={`/${row.pic}`} height={50} width={50} className="rounded" alt="" />
    </a>},
 
 { field: "message", headerName: "Message", width: 300 },
    
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
      width: 70,
      renderCell: ({row}) => 
        <Link
          to={`/admin/testimonial/update/${row._id} `}
          className="btn btn-primary"
        >
          <i className="fa fa-edit"></i>
        </Link>
      
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: ({row}) => 
        <button className="btn btn-danger" onClick={() => deleteData(row._id)}>
          <i className="fa fa-trash"></i>
        </button>
      
    },
  ]
  let TestimonialStateData= useSelector((state)=>state.TestimonialStateData)
    let dispatch = useDispatch();


   function deleteData(_id) {
    if (window.confirm("Are You Sure to Delete that Item: ")) {
     
      dispatch(getTestimonial())
      if (TestimonialStateData.length)
        setData(TestimonialStateData);
      dispatch(deleteTestimonial({ _id: _id }));
    
  
      getAPIData();
    }
  }

 function getAPIData() {
   
    dispatch(getTestimonial())
    if (TestimonialStateData.length)
      setData(TestimonialStateData);
    else
     setData([]);
  }

  useEffect(() => {
    getAPIData();
  }, [TestimonialStateData.length]);
 
   return(
    <>
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-md-3">
            <Sidebar />
          </div>

          <div className="col-md-9">
            <h5 className="bg-primary p-2 text-center text-light">
              Testimonial
              <Link to="/admin/testimonial/create">
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
