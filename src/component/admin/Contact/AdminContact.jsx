import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact, getContact } from "../../../Store/ActionCreators/ContactusActionCreators";
import { updateContact } from "../../../Store/ActionCreators/ContactusActionCreators";
export default function AdminContact() {
  let [data, setData] = useState([])
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "email", headerName: "Email", width: 300 },
    {
      field: "active",
      headerName: "Active",
      width: 100,
      renderCell: ({row}) =>
        <p title="Click to Change Status" 
        onClick={()=>updateData(row.id,row.active)}
         className={row.active ? "text-success" : "text-danger"}>
          {row.active ? "Yes" : "No"}
        </p>
    
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
  let ContactStateData=useSelector((state)=>state.ContactStateData)
    let dispatch = useDispatch();


  function deleteData(id) {
    if (window.confirm("Are You Sure to Delete that Item: ")) {
      dispatch(deleteContact({ id:id }));
      getAPIData();
    }
  }

  function updateData(id,status) {
    if (window.confirm("Are You Sure to Change Status: ")) {
      dispatch(updateContact({ id: id, active:!status }));
      getAPIData();
    }
  }

 function getAPIData() {
 dispatch(getContact())
    if (ContactStateData.length)
      setData(ContactStateData);
    else
     setData([]);
  }

  useEffect(() => {
    getAPIData();
  }, [ContactStateData.length]);

   return(
    <>
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-md-3">
            <Sidebar />
          </div>

          <div className="col-md-9">
            <h5 className="bg-primary p-2 text-center text-light">
              Contact
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