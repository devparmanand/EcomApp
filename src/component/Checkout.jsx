import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getCart,
  deleteCart,
} from "../Store/ActionCreators/CartActionCreators";
import { useDispatch, useSelector } from "react-redux";
import ProfileTable from "./partials/ProfileTable";
import { createCheckout } from "../Store/ActionCreators/CheckoutActionCreators ";
import {
  getProduct,

} from "../Store/ActionCreators/ProductActionCreators";
import { updateProduct } from "../Store/ActionCreators/ProductActionCreators";
export default function Checkout() {
  let [user, setUser] = useState({});

  let [cart, setCart] = useState([]);
  let dispatch = useDispatch();
  let [subtotal, setSubtotal] = useState(0);
  let [shipping, setShipping] = useState(0);
  let [total, setTotal] = useState(0);
  let navigate = useNavigate();
  let [mode, setMode] = useState("COD")
  let CartStateData = useSelector((state) => state.CartStateData);
  let ProductStateData = useSelector((state) => state.ProductStateData);

  function placeOrder() {
    let item = {
      user: localStorage.getItem("userid"),
      orderStatus: "Order is Placed",
      paymentMode:mode,
      // paymentMode: "COD",
      paymentStatus: "Pending",
      subtotal: subtotal,
      shipping: shipping,
      total: total,
      date: new Date(), //for row date
      products: cart,
    };
    dispatch(createCheckout(item));
    // console.log(item);
    
    for (let item of cart) {
      let product = ProductStateData.find((x) => x._id === item.product?._id);
      product.stockQuantity = product.stockQuantity- item.qty;
      product.stock = product.stockQuantity===0?false:true
      // if (Product.quantity === 0) Product.stock = false;
      let formData = new FormData()
      formData.append("_id" , product._id)
      formData.append("stockQuantity" , product.stockQuantity)
      formData.append("stock" , product.stock)
      dispatch(updateProduct(formData));
      dispatch(deleteCart({ _id: item._id }));
    }
if(mode!== "COD"){
  navigate("/payment")
}
else
    navigate("/confirmation");
  }
  useEffect(() => {
    (() => {
      dispatch(getCart());
      if (CartStateData.length) {
        let data = CartStateData
        setCart(data);
        let sum = 0;
        for (let item of data) {
          sum = sum + item.total;
        }
        setSubtotal(sum);
        if (sum > 0 && sum < 1000) {
          setShipping(150);
          setTotal(sum + 150);
        } else {
          setTotal(sum);
          setShipping(0);
        }
      } else setCart([]);
    })();
  }, [CartStateData.length]);

  //product get karne ke liye useeffect
  useEffect(() => {
    (() => {
      dispatch(getProduct());
    })();
  }, ProductStateData.length);

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
// console.log(response.data);

if(response.result === "Done")
    setUser(response.data)
else
navigate("/login")
        })()
    },[])
  
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <ProfileTable title="Billing Address" user={user} />
          </div>
          <div className="col-md-6">
            <h5 className="bg-primary text-center text-light p-2">
              Items In Your Cart
            </h5>
            {cart.length ? (
              <div className="table-responsive">
                <table className="table table-bordered">
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
                    cart.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <a
                              href={`/${item.product?.pic}`}
                              target="_blank"
                              rel="noreferrer"
                            ></a>
                            <img src={`/${item.product?.pic}`} height={50} width={50} alt="" />
                          </td>
                          <td>{item.product?.name}</td>
                          <td>&#8377;{item.product?.finalPrice}</td>
                          <td>{item.qty}</td>
                          <td>&#8377;{item.total}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <table className="table table-bordered">
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
                        <select
                          name="mode"
                          onChange={(e) => setMode(e.target.value)}
                          value={mode}
                          className="form-select"
                        >
                          <option value="COD">COD</option>
                          <option value="Net Banking">
                            Net Banking/Card/UPI/EMI
                          </option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <button
                          className="btn btn-primary w-100"
                          onClick={placeOrder}
                        >
                          Place Order
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center">
                <h5>No Item In Cart</h5>
                <Link to="/shop" className="btn btn-primary">
                  Shop Now
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
