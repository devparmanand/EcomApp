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
let response = await fetch("/api/user",{
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
        setWishlist(WishlistStateData.filter((x)=>x.user===localStorage.getItem("userid")))
   else
   setWishlist([])
}

function deleteData(id) {
    if (window.confirm("Are You Sure to Remove Item from Wishlist: ")) {
    dispatch(deleteWishlist({ id: id }));
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
        setOrders(CheckoutStateData.filter((x)=>x.user===localStorage.getItem("userid"))) //yaha se corrent user ke checkout filter ho jayenge
    }
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
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
               {
                wishlist.map((item,index)=>{
                    return  <tr key={index}>
                    <td>
                        <a href={item.pic} target='_blank' rel='noreferrer'></a>
                        <img src={item.pic} height={50} width={50} alt="" />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.brand}</td>
                    <td>{item.color}</td>
                    <td>{item.size}</td>
                    <td>&#8377;{item.price}</td>
                    <td><Link to={`/product/${item.product}`} className='btn btn-primary'><i className='fa fa-shopping-cart'></i></Link></td>
                    <td><button className='btn btn-danger' onClick={()=>deleteData(item.id)}><i className='fa fa-trash'></i></button></td>
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
                            <td>{item.id}</td>
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
                item.products.map((item,index)=>{
                    return  <tr   key={index}>
                    <td>
                        <a href={item.pic} target='_blank' rel='noreferrer'></a>
                        <img src={item.pic} height={50} width={50} alt="" />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.brand}</td>
                    <td>{item.color}</td>
                    <td>{item.size}</td>
                    <td>&#8377;{item.price}</td>
                    <td>{item.qty}</td>
                    <td>&#8377;{item.total}</td>
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
