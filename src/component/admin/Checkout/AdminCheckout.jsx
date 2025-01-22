import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "../Sidebar";
import { getCheckout } from "../../../Store/ActionCreators/CheckoutActionCreators ";
import { deleteCheckout } from "../../../Store/ActionCreators/CheckoutActionCreators ";
import { updateCheckout } from "../../../Store/ActionCreators/CheckoutActionCreators ";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function AdminCheckout() {
  let [data, setData] = useState([])
  let {_id} = useParams()
  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "orderStatus", headerName: "Order Status", width: 150 },
    { field: "paymentMode", headerName: "Payment Mode", width: 150 },
    { field: "paymentStatus", headerName: "Payment Status", width: 150 },
    { field: "subtotal", headerName: "finalPrice", width: 100 },
    { field: "shipping", headerName: "Shipping", width: 100 },
    { field: "total", headerName: "Total", width: 100 },
    
  
 {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: ({row}) => (
        <button className="btn btn-danger" onClick={() => deleteData(row._id)}>
          <i className="fa fa-trash"></i>
        </button>
      )
    }
  ]
  let CheckoutStateData=useSelector((state)=>state.CheckoutStateData)
    let dispatch = useDispatch();


  function deleteData(_id) {
    if (window.confirm("Are You Sure to Delete that Item: ")) {
      dispatch(deleteCheckout({ _id:_id }));
      getAPIData();
    }
  }

  function updateData(_id,status) {
    if (window.confirm("Are You Sure to Change Status: ")) {
      dispatch(updateCheckout({ _id: _id, active:!status }));
      getAPIData();
    }
  }

 function getAPIData() {
 dispatch(getCheckout())
    if (CheckoutStateData.length){
      setData(CheckoutStateData);
    console.log(CheckoutStateData);
    }
      
    
    else
     setData([]);
  }

  useEffect(() => {
   (()=>{
    getAPIData();
   })()
  }, [CheckoutStateData.length]);

   return(
    <>
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-md-3">
            <Sidebar />
          </div>

          <div className="col-md-9">
            <h5 className="bg-primary p-2 text-center text-light">
              Checkout
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
