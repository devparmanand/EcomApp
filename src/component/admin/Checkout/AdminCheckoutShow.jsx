import React, { useEffect } from 'react'
import { getCheckout } from '../../../Store/ActionCreators/CheckoutActionCreators '
import { useDispatch, useSelector } from 'react-redux'
export default function AdminCheckoutShow() {
  let [data , setData] = useState([])
  let CheckoutStateData = useSelector((state)=>state.CheckoutStateData)
  let dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getCheckout())
  } , [CheckoutStateData.length])
  return (
<>
<div className="container-fluid">
  <div className="table-responsive">
    <table className='table table-bordered'>
            <thead>
              <th>Id</th>
              <th>Order Status</th>
              <th>PaymentStatus</th>
              <th>PaymentMode</th>
              <th>Subtotal</th>
              <th>Shipping</th>
              <th>total</th>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
    </table>
  </div>
</div>

</>
  )
}
