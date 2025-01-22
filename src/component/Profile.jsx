import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProfileTable from './partials/ProfileTable'
import { useDispatch, useSelector } from 'react-redux'
import {deleteWishlist, getWishlist}  from "../Store/ActionCreators/WishlistActionCreators"
import { getCheckout } from '../Store/ActionCreators/CheckoutActionCreators '
export default function Profile() {
    // state variable
    let [user,setUser]=useState({})
    let navigate =useNavigate()
    let [wishlist,setWishlist]=useState([])
    let [orders,setOrders]=useState([])

    let dispatch=useDispatch()
  //state ka data get karne ke liye  
    let WishlistStateData=useSelector((state)=>state.WishlistStateData)
    let CheckoutStateData=useSelector((state)=>state.CheckoutStateData)
    useEffect(()=>{
        (async()=>{
let response = await fetch("/api/user/"+localStorage.getItem("userid"),{
    method:"GET",
    headers:{
        "content-type":"application/json",
        "authorization":localStorage.getItem("token")
    }

})
response=await response.json()
if(response.result === "Done")
    setUser(response.data)

else
navigate("/login")
        })()
    },[])
function getAPIData(){
    dispatch(getWishlist())
    if(WishlistStateData.length)
        setWishlist(WishlistStateData)
   else
   setWishlist([])
}

function deleteData(_id) {
    // console.log(_id);
    
    if (window.confirm("Are You Sure to Remove Item from Wishlist: ")) {
    dispatch(deleteWishlist({ _id: _id }));
    getAPIData();
    }
  }

useEffect(()=>{
    (()=>{
    getAPIData()
   })()
},[WishlistStateData.length])

useEffect(()=>{
    (()=>{
    dispatch(getCheckout())
    if(CheckoutStateData.length){
        
        setOrders(CheckoutStateData) //yaha se corrent user ke checkout filter ho jayenge
    // console.log(CheckoutStateData);
    
    }
    else
    setOrders([])
   })()
},[CheckoutStateData.length])
  return (
    <>

    <div className="container-fluid">
        <div className="row">
            <div className="col-md-6">
                {
                    user.pic?
                    <img src={user.pic} height={430} width="100%" alt="User Image"/>:
                    <img src="/img/noimage.png" height={430} width="100%"  alt="User Image"/>
                }
            </div>
            <div className="col-md-6">
                <ProfileTable title="Buyer Profile" user={user}/>
            </div>
        </div>
        <h5 className='bg-primary text-light text-center p-2'>Wishlist Section</h5>
        {
            wishlist.length?
            <div className="table-responsive">
             <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th></th>



                        
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Color</th>
                        <th>Size</th>
                        <th>Price</th>
                        <th>Add to Cart</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
               {
                wishlist.map((item,index)=>{
                    return  <tr key={index}>
                    <td>
                        <a href={`/${item.product?.pic[0]}`} target='_blank' rel='noreferrer'>
                        <img src={`/${item.product?.pic[0]}`} height={50} width={50} alt="" />
                        
                        </a>
                    </td>
                    <td>{item.product?.name}</td>
                    <td>{item.product?.brand.name}</td>
                    <td>{item.product?.color}</td>
                    <td>{item.product?.size}</td>
                    <td>&#8377;{item.product?.finalPrice}</td>
                    <td><Link to={`/product/${item.product?._id}`} className='btn btn-primary'><i className='fa fa-shopping-cart'></i></Link></td>
                    <td><button className='btn btn-danger' onClick={()=>deleteData(item._id)}><i className='fa fa-trash'></i></button></td>
                </tr>
                })
               }
                </tbody>
             </table>
            </div>:
            <div className='text-center'>
                <h5>No Item In Wishlist</h5>
                <Link to="/shop" className="btn btn-primary">Shop Now</Link>
            </div>
        }


<h5 className='bg-primary text-light text-center my-3 p-2'>Order History Section</h5>
{
    orders.length?
     orders.map((item,index)=>{
        return  <div className='row border-bottom border-primary border-2  mb-3' key={index}>
        <div className="col-md-3">
            <div className="table-responsive">
                <table className='table table-bordered'>
                    <tbody>
                        <tr>
                            <th>Order Id</th>
                            <td>{item._id}</td>
                        </tr>
                        <tr>
                            <th>Order Status</th>
                            <td>{item.orderStatus}</td>
                        </tr>
                        <tr>
                            <th>Payment Mode</th>
                            <td>{item.paymentMode}</td>
                        </tr>
                        <tr>
                            <th>Payment Status</th>
                            <td>{item.paymentStatus}</td>
                        </tr>
                        <tr>
                            <th>Sub Total</th>
                            <td>&#8377;{item.subtotal}</td>
                        </tr>
                        <tr>
                            <th>Shipping Charge</th>
                            <td>&#8377;{item.shipping}</td>
                        </tr>
                        <tr>
                            <th>Total</th>
                            <td>&#8377;{item.total}</td>
                        </tr>
                        <tr>
                            <th>Date</th>
                            <td>{new Date(item.date).toLocaleString()}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="col-md-9">
        <div className="table-responsive">
             <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th></th>
                         <th>Name</th>
                        <th>Brand</th>
                        <th>Color</th>
                        <th>Size</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
               {
                item.products?.map((p,ind)=>{
                    return  <tr   key={ind}>
                    <td>
                        <a href={`/${p.product?.pic[0]}`} target='_blank' rel='noreferrer'>
                        <img src={`/${p.product?.pic[0]}`} height={50} width={50} alt="" />
                        
                        </a>
                    </td> 
                    <td>{p.product?.name}</td>
                    <td>{p.product?.brand.name}</td>
                    <td>{p.product?.color}</td>
                    <td>{p.product?.size}</td>
                    <td>&#8377;{p.product?.finalPrice}</td>
                    <td>{p.qty}</td>
                    <td>&#8377;{p.total}</td>
                </tr>
                })
               }
                </tbody>
             </table>
            </div>
        </div>
        </div>
     })
    :
    <div className='text-center'>
    <h5>No Orders History Found</h5>
    <Link to="/shop" className="btn btn-primary">Shop Now</Link>
</div>
}
    </div>

    </>
  )
}
