import React, { useEffect, useState } from 'react'
import { Link, useNavigate, } from 'react-router-dom'
import { getCart,deleteCart}  from "../Store/ActionCreators/CartActionCreators"
import { useDispatch, useSelector } from 'react-redux'
import ProfileTable from './partials/ProfileTable'
import {createCheckout} from "../Store/ActionCreators/CheckoutActionCreators "
import {getProduct, updateProductQuantity } from '../Store/ActionCreators/ProductActionCreators'
export default function Checkout() {
  let [user,setUser]=useState({})

  let [cart,setCart]=useState([])
  let dispatch=useDispatch()
  let [subtotal,setSubtotal]=useState(0)
  let [shipping,setShipping]=useState(0)
  let [total,setTotal]=useState(0)
  let navigate=useNavigate()
  let[mode,setMode]=("COD")
  let CartStateData=useSelector((state)=>state.CartStateData)
  let ProductStateData=useSelector((state)=>state.ProductStateData)
    


  function placeOrder(){
    let item={
      user:localStorage.getItem("userid"),
      orderStatus:"Order is Placed",
      // paymentMode:mode,
      paymentMode:"COD",
      paymentStatus:"Pending",
      subtotal:subtotal,
      shipping:shipping,
      total:total,
      date:new Date(),   //for row date
      products:cart
      

    }
    dispatch(createCheckout(item))
    for(let item of cart){
      let p=ProductStateData.find((x)=>x.id===item.product)
      p.quantity=p.quantity-item.qty
      if(p.quantity===0)
        p.stock=false
        dispatch(updateProductQuantity({...p}))
      dispatch(deleteCart({id:item.id}))
    }
    navigate("/confirmation")
  }
useEffect(()=>{
  (()=>{
  dispatch(getCart())
  if(CartStateData.length){
    let data=CartStateData.filter((x)=>x.user===localStorage.getItem("userid"))
    setCart(data)
    let sum=0;
    for(let item of data){
        sum=sum+item.total
      }
      setSubtotal(sum)
      if(sum>0 && sum<1000){
        setShipping(150)
        setSubtotal(sum+150)
      }
      else{
       setTotal(sum)
       setShipping(0)
      }
    }
   
else
setCart([])
})()
},[CartStateData.length])

//product get karne ke liye useeffect
useEffect(()=>{
  (()=>{
dispatch(getProduct())
  })()
})



useEffect(()=>{
  (async()=>{
let response = await fetch("/user",{
method:"get",
headers:{
  "content-type":"application/json"
}

})
response=await response.json()
let item= response.find((x)=>x.id===localStorage.getItem("userid"))
if(item)
setUser(item)
else
navigate("/login")
  })()
},[])
  return (
    <>
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <ProfileTable title="Billing Address" user={user}/>
        </div>
        <div className="col-md-6">
          <h5 className='bg-primary text-center text-light p-2'>Items In Your Cart</h5>
{
  cart.length?        <div className="table-responsive">
  <table className='table table-bordered'>
     <thead>
         <tr>
             <th></th>
              <th>Name</th>
             <th>Price</th>
             <th>Qty</th>
             <th>Total</th>
         </tr>
     </thead>
     <tbody>
    {
     cart.map((item,index)=>{
         return  <tr key={index}>
         <td>
             <a href={item.pic} target='_blank' rel='noreferrer'></a>
             <img src={item.pic} height={50} width={50} alt="" />
         </td>
         <td>{item.name}</td>
         <td>&#8377;{item.price}</td>
         <td>{item.qty}</td>
         <td>&#8377;{item.total}</td>
     </tr>
     })
    }
     </tbody>
  </table>
  <table className='table table-bordered'>
         <tbody>
           <tr>
           <th>Subtotal</th>
           <td>&#8377;{subtotal}</td>
           </tr>
           <tr>
           <th>Shipping</th>
           <td>&#8377;{shipping}</td>
           </tr>
           <tr>
           <th>Total</th>
           <td>&#8377;{total}</td>
           </tr>
           <tr>
             <th>Payment Mode</th>
             <td>
               <select name="mode" onChange={(e)=>setMode(e.target.value)} className='form-select'>
               <option value="COD">COD</option>
               <option value="Net Banking">Net Banking/Card/UPI/EMI</option>
              </select>
             </td>
           </tr>
           <tr>
           <td colSpan={2} ><button className='btn btn-primary w-100'onClick={placeOrder} >Place Order</button></td>
           </tr>
         </tbody>

     </table>
 </div>:  <div className='text-center'>
                <h5>No Item In Cart</h5>
                <Link to="/shop" className="btn btn-primary">Shop Now</Link>
            </div>
}
        </div>
      </div>
    </div>
    </>
  )
}
