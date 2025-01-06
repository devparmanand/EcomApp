import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCart,
  getCart,
  updateCart,
} from "../Store/ActionCreators/CartActionCreators";

export default function Cart() {
  let [cart, setCart] = useState([]);
  let dispatch = useDispatch();
  let [subtotal, setSubtotal] = useState(0);
  let [shipping, setShipping] = useState(0);
  let [total, setTotal] = useState(0);

  let CartStateData = useSelector((state) => state.CartStateData);

function calculate(data) {
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
  
}

  function deleteData(_id) {
    if (window.confirm("Are You Sure to Remove Item from Cart: ")) {
      dispatch(deleteCart({ _id: _id }));
      getAPIData();
    }
  }

  function updateData(_id, option) {
    let item = cart.find((x) => x._id === _id)
    let index = cart.findIndex((x) => x._id === _id)
// console.log(item);
// return
    if (item){
      if(option === "DEC" && item.qty===1)
        return
    else if (option === "DEC") {
      item.qty = item.qty - 1;
      item.total = item.total - item.product?.finalPrice;
    }
     else {
      if (item.qty < item.product?.stockQuantity) {
        item.qty = item.qty + 1;
        item.total = item.total + item.product?.finalPrice;
      }
    }
    dispatch(updateCart({ ...item }));
    cart[index].qty=item.qty
    cart[index].total=item.total
 calculate(cart)
     
    }
   
  }
  function getAPIData() {
    dispatch(getCart());
    if (CartStateData.length) {
      let data = CartStateData;
      setCart(data);
    calculate(data)
    } else 
    setCart([]);
  }
  useEffect(() => {
    (() => {
      getAPIData();
    })();
  }, [CartStateData.length]);
  return (
    <>
      <div className="container-fluid my-3">
        <h5 className="bg-primary text-light text-center p-2">Cart Section</h5>
        {cart.length ? (
          <>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Price</th>
                    <th></th>
                    <th>Qty</th>
                    <th></th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <a
                            href={`/${item.product?.pic}`}
                            target="_blank"
                            rel="noreferrer"
                          ></a>
                          <img
                            src={`/${item.product?.pic}`}
                            height={50}
                            width={50}
                            alt=""
                          />
                        </td>
                        <td>{item.product?.name}</td>
                        <td>{item.product?.brand.name}</td>
                        <td>{item.product?.color}</td>
                        <td>{item.product?.size}</td>
                        <td>&#8377;{item.product?.finalPrice}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => updateData(item._id, "DEC")}
                          >
                            <i className="fa fa-minus"></i>
                          </button>
                        </td>
                        <td>{item.qty}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => updateData(item._id, "INC")}
                          >
                            <i className="fa fa-plus"></i>
                          </button>
                        </td>
                        <td>&#8377;{item.total}</td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteData(item._id)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="row">
              <div className="col-md-6"></div>
              <div className="col-md-6">
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
                      <td colSpan={2}>
                        <Link to="/checkout" className="btn btn-primary w-100">
                          Proceed to Checkout
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h5>No Item In Cart</h5>
            <Link to="/shop" className="btn btn-primary">
              Shop Now
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
