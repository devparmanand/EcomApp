import React, { useEffect, useState } from "react";
// import { DataGrid } from "@mui/x-data-grid";

import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";

import {getProduct,deleteProduct} from "../../../Store/ActionCreators/ProductActionCreators"
import { useDispatch, useSelector } from "react-redux";


export default function AdminProduct() {
  let [maincategor0y,setMaincategor0y]=useState([])
  let [data, setData] = useState([])
  // const columns = [
  //   { field: "_id", headerName: "ID", width: 250 },
  //   { field: "name", headerName: "Name", width: 200 },
  //   { field:"maincategor", headerName: "Maincategory", width: 200 },
  //   { field: "subcategory", headerName: "Subcategory", width: 200 },
  //   { field: "brand", headerName: "Brand", width: 200 },
  //   { field: "color", headerName: "Color", width:150 },
  //   { field: "size", headerName: "Size", width: 150 },
  //   { field: "stock", headerName: "Stock", width: 300,renderCell:({row})=><span>{row.stock?"In Stock" :"Out of Stock"}</span> },
  //   { field: "stockQuantity", headerName: "Stock Quantity", width: 200 },
  //   { field: "basePrice", headerName: "BasePrice", width: 150,renderCell:({row})=><span>&#8377;{row.basePrice}</span> },
  //   { field: "discount", headerName: "Discount", width: 200, renderCell:({row})=><span>{row.discount}% Off</span> },
  //   { field: "finalPrice", headerName: "FinalPrice", width: 200,renderCell:({row})=><span>&#8377;{row.finalPrice}</span> },
    
  //     { field: "pic", headerName: "Pic", width: 300 ,renderCell:({row})=>row.pic?.map((item,index)=>{
  //       return  <a key={index} href={`http://localhost:8000/${item}`} target='_blank' rel="noreferrer" >
  //       <img src={`/${item}`} height={50} width={50} className="rounded" alt="" />
  //     </a>
  //      })
  //     },   
       
  //   {
  //     field: "active",
  //     headerName: "Active",
  //     width: 100,
  //     renderCell: ({row}) => 
  //       <p className={row.active ? "text-success" : "text-danger"}>
  //         {row.active ? "Yes" : "No"}
  //       </p>
      
  //   },
  //   {
  //     field: "edit",
  //     headerName: "Edit",
  //     width: 100,
  //     renderCell: ({row}) => (
  //       <Link
  //         to={`/admin/product/update/${row._id} `}
  //         className="btn btn-primary"
  //       >
  //         <i className="fa fa-edit"></i>
  //       </Link>
  //     ),
  //   },
  //   {
  //     field: "delete",
  //     headerName: "Delete",
  //     width: 100,
  //     renderCell: ({row}) => (
  //       <button className="btn btn-danger" onClick={() => deleteData(row._id)}>
  //         <i className="fa fa-trash"></i>
  //       </button>
  //     ),
  //   },
  // ]
  let ProductStateData= useSelector((state)=>state.ProductStateData)
    let dispatch = useDispatch();

  //data get karne ke liye

   function deleteData(_id) {
    console.log(_id);
    
    if (window.confirm("Are You Sure to Delete that Item: ")) {
      // let response=await fetch("http://localhost:8000/product/"+id,{
      //   method:"DELETE",
      //   headers:{
      //     "content-type":"application/json"
      //   },
      //   body:JSON.stringify({...data})
      // })
      // response=await response.json()
      dispatch(getProduct())
      if (ProductStateData.length)
        setData(ProductStateData);
      // setData(response)
      dispatch(deleteProduct({ _id:_id }));
    
  
      getAPIData();
    }
  }

 function getAPIData() {
    // let response= await fetch("http://localhost:8000/Product",{
    //   method:"GET",
    //   headers:{
    //     "content-type":"application/json"
    //   },
    //   // body:JSON.stringify({...data}) 
    // })
    // response=await response.json()
    dispatch(getProduct())
    if (ProductStateData.length){
      setData(ProductStateData);
      let item = ProductStateData.map((x)=>x.maincategory.name)
      // console.log(item[0]);
      setMaincategor0y(item)
      setMaincategor0y(data)
           
    }

    
    // setData(response)
    else
     setData([]);
  }

  useEffect(() => { 
    getAPIData();
  }, [ProductStateData.length]);
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
              Product
              <Link to="/admin/product/create">
                <i className="fa fa-plus text-light float-end"></i>
              </Link>
            </h5>
            <div className="table-responsive">
              {/* <div style={{height: 400, width:'100%'}}>
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
              </div> */}


              <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>MainCategory </th>
                  <th>SubCategory</th>
                  <th>Brand</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>BasePrice</th>
                  <th>Discount</th>
                  <th>FinalPrice</th>
                  <th>Stock</th>
                  <th>Stock Quantity</th>
                  <th>Pic</th>
                  <th>Active</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((item, index)=>{
                    return(
                      <tr key={index}>
                        <td>{item._id}</td>
                        <td >
                          <div style={{width:200}}>
                          {item.name}
                          </div>

                          </td>
                        <td>{item.maincategory.name}</td>
                        <td>{item.subcategory.name}</td>
                        <td>{item.brand.name}</td>
                        <td>{item.color}</td>
                        <td>{item.size}</td>
                        <td><span>&#8377;{item.basePrice}</span></td>
                        <td><  span>{item.discount}% Off</span></td>
                        <td><span>&#8377;{item.finalPrice}</span></td>
                        <td className={`${item.stock?"text-success":"text-danger"}`}>
                        <div style={{width:100}}>
                        {item.stock ? "In Stock":"Out of Stock"}
                        </div>
                          </td>
                        <td>{item.stockQuantity}</td>
                        <td>
                          <div style={{width:300}}>
                          {
                             item.pic.map((img,index)=>{
                              return <Link key={index} to={`http://localhost:8000/${img}`} target="blank" rel="noreferrer">
                                <img src={`/${img}`} height={50} width={50} alt="Product image" />
                              </Link>
                             })

                          //    <a href={`http://localhost:8000/${row.pic}`} target='_blank' rel="noreferrer">
                          //    <img src={`/${row.pic
                          //    }`} height={50} width={50} className="rounded" alt="" />
                          //  </a>
                           }
                          </div>
                         
                          {/* <img src={`/${item.pic}`} alt="" width={"50px"}
                           height={"50px"} srcset="" /> */}
                        </td>
                        <td className={`${item.active? "text-success":"text-danger"}`}>{item.active? "Yes" : "No"}</td>
                        <td>  <Link
                                  to={`/admin/product/update/${item._id} `}
                                  className="btn btn-primary"
                                >
                                  <i className="fa fa-edit"></i>
                                </Link></td>
              
                           <td>
                           <button className="btn btn-danger" onClick={() => deleteData(item._id)}>
                           <i className="fa fa-trash"></i>
                            </button>
                           </td>
                      </tr>
                    )
                  })
                }
              </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
