import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Formvalidators from "./validators/Formvalidators"
import {createContact} from "../Store/ActionCreators/ContactusActionCreators"
export default function Contactus() {
  var [data,setData]=useState({
    name:"",
    email:"",
    phone:"",
    subject:"",
    message:"",
  
  })

  var [errorMessage,setErrorMessage]=useState({
    name:"Name is Mandatory",
    email:"Email is Mandatory",
    phone:"Phone is Mandatory",
    subject:"Subject is Mandatory",
    message:"Message is Mandatory",
  
  })

  let [show,setShow]=useState(false)
  let [message,setMessage]=useState("")
  let dispatch=useDispatch()

   function getInputData(e){
    let{name,value}=e.target
 setErrorMessage((old)=>{
       return{
        ...old,
        [name]:Formvalidators(e)
        
       } 
      })
      setData((old)=>{
        return {
          ...old,
          [name]:value
        }
       })
   }

  function postData(e){
    e.preventdefault()
    let error=Object.values(errorMessage).find((x)=>x.length>0)
    if(error)
      setShow(true)
    else{
      dispatch(createContact({...data,date:new Date ,active:true}))
      setMessage("Thanks to share Your Query with us,Our team Will Contact You Soon")
    }
  }

  return (
    <>
     {/* <!-- Contact Start --> */}
    <div className="container-xxl py-5">
      <div className="container">
      <div className="wow fadeInUp mb-5" data-wow-delay="0.1s">
            <div className="row g-4 align-items-center">
              <div className="col-sm-6">
                <img className="img-fluid" style={{height:400,width:"100%"}} 
                src="img/p2.jpeg" alt="" />
              </div>
              <div className="col-sm-6">
                <h3 className="mb-0">Eco App (Block A, Phase-2, Noida, UP)</h3>
                <h6>Contact Details</h6>
                <p className='text-justify'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis tempora dolorem optio ipsam sed laborum error velit nisi provident culpa, explicabo animi tenetur id exercitationem incidunt, reiciendis ut labore quibusdam assumenda vitae molestiae expedita voluptas accusantium tempore! Perferendis eveniet ipsa, ut ullam ab voluptatum consequuntur, alias doloremque et velit deserunt iste soluta vero consectetur, temporibus ad cum exercitationem error eligendi sint quo! Molestias laboriosam vitae velit error beatae et eveniet dolorem nostrum aut assumenda, dicta cupiditate nesciunt iure quam in accusamus. Veniam vitae neque asperiores sed culpa voluptatum vero similique dicta accusantium? Dolorum aliquam laboriosam perferendis repudiandae hic. Porro, minus.</p>
                <div className='d-flex justify-content-between'>
                <p className="mb-0"><i className='fa fa-phone'></i>  <a href="tel:9368394493">+919368394493</a></p>
               <p className="mb-0">
                 <i className='fa fa-envelope'></i> <a href="mailto:pjha38622gmail.com">pjha38622gmail.com</a>
               </p>
                </div>
              </div>
            </div>
            </div>
        <div className="row g-5">
        <div
            className="col-lg-6 wow fadeInUp "
            data-wow-delay="0.1s"
            style={{minHeight:"450px"}}
          >
           <div className="position-relative h-100">
            
            <div className="mapouter"><div className="gmap_canvas">
              <iframe width="100%" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=nagla%20phase%202%20noida&t=&z=13&ie=UTF8&iwloc=&output=embed" ></iframe>
              </div></div>
          </div>
          </div> 

          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
            <div className="border-start border-5 border-primary ps-4 mb-5">
              <h6 className="text-body text-uppercase mb-2">Contact Us</h6>
              <h5 className=" mb-0">
                If You Have Any Query, Please Contact Us
              </h5>
            </div>
            {message ? <p className='text-success'>{message}</p>: ""}
            <form onSubmit={postData}>
            <div className="mb-3">
              <input type="text"  name="name" onChange={getInputData} value={data.name}
               className={`form-control border-2 ${show && errorMessage.name ? 'border-danger':'border-primary'}`} placeholder='Full Name*' id="" />
           {show && errorMessage.name?<p className='text-danger'>{errorMessage.name}</p>:""}
           </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                <div className="mb-3">
              <input type="email"  name="email" onChange={getInputData} value={data.email}
               className={`form-control border-2 ${show && errorMessage.email ? 'border-danger':'border-primary'}`} placeholder='Email Address*' id="" />
           {show && errorMessage.email?<p className='text-danger'>{errorMessage.email}</p>:""}
            </div>
                </div>

                <div className="col-md-6 mb-3">
                <div className="mb-3">
              <input type="number"  name="phone" onChange={getInputData} value={data.phone}
               className={`form-control border-2 ${show && errorMessage.email ? 'border-danger':'border-primary'}`} placeholder='Phone Number*' id="" />
           {show && errorMessage.phone?<p className='text-danger'>{errorMessage.phone}</p>:""}
            </div>
                </div>


            </div>

              
                <div className="mb-3">
              <input type="text"  name="subject" onChange={getInputData} value={data.subject} 
              className={`form-control border-2 ${show && errorMessage.subject ? 'border-danger':'border-primary'}`} placeholder='Subject*' id="" />
           {show && errorMessage.subject?<p className='text-danger'>{errorMessage.subject}</p>:""}
           </div>

              <div className="mb-3">
                <textarea name="message"   onChange={getInputData} value={data.message} rows={3}
                 className={`form-control border-2 ${show && errorMessage.message ? 'border-danger':'border-primary'}`} placeholder='Message*' id="">
           {show && errorMessage.message?<p className='text-danger'>{errorMessage.message}</p>:""} 

                </textarea>
              </div>

            <div className="mb-3">
            <button  type="submit" className='btn btn-primary w-100'>Submit</button>
           </div>
            </form>
          </div>
          </div>
        </div>
      </div>
    
    {/* <!-- Contact End --> */}
    </>
  )
}
