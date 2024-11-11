import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {getNewsletter,createNewsletter} from "../../Store/ActionCreators/NewsletterActionCreators"
import { useDispatch, useSelector } from "react-redux";
export default function Footer() {
  let [email,setEmail]=useState("")
  let [message,setMessage]=useState("")

  let dispatch =useDispatch()
  let NewsletterStateData=useSelector((state)=>state.NewsletterStateData)

function postData(){
  let item =NewsletterStateData.find((x)=>x.email===email)
  if(item)
    setMessage("Your Email Address is Already Registered")
  else{
  dispatch(createNewsletter({email:email,active:true}))
  setMessage("Thanks to Subscribe Our Newsletter Service")

  }
}
  
  useEffect(()=>{
    (()=>{
     dispatch(getNewsletter())
    })()
  },[NewsletterStateData.length])
  return (
    <>
      {/* <!-- Footer Start --> */}
      <div
        className="container-fluid bg-dark footer mt-5 pt-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <h1 className="text-white mb-4">
                <i className="fa fa-home text-primary me-3"></i>ecoApp
              </h1>
              <p className="text-light">
                Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita
                erat ipsum et lorem et sit, sed stet lorem sit clita
              </p>
              <div className="d-flex pt-2">
                <a className="btn btn-square btn-outline-primary me-1" href="#">
                  <i className="fab fa-twitter"></i>
                </a>
                <a className="btn btn-square btn-outline-primary me-1" href="#">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a className="btn btn-square btn-outline-primary me-1" href="#">
                  <i className="fab fa-youtube"></i>
                </a>
                <a className="btn btn-square btn-outline-primary me-0" href="#">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-light mb-4">Contact-us</h4>
              <p className="text-light">
                <i className="fa fa-map-marker-alt me-3"></i>
                A-12,Sector-81 Noida
              </p >
              <p className="text-light"  to="tel:9368394493">
                <i className="fa fa-phone-alt me-3"></i>+919368394493
              </p >
              <p className="text-light"  to="mailto:pjha3861@gmai.com">
                <i className="fa fa-envelope me-3"></i>pjha3861@gmailcom
              </p >
            </div>
            <div className="col-lg-2 col-md-6">
              <h4 className="text-light mb-4">Quick Links</h4>
              <Link  className="text-light btn btn-link" to="/home">
                Home
              </Link>
              <Link  className="text-light btn btn-link" to="/about">
                About Us
              </Link>
              <Link  className="text-light btn btn-link" to="/shop">
                Shop
              </Link>
              <Link  className="text-light btn btn-link" to="/contact">
                Contact Us
              </Link>
          
            </div>
            <div className="col-lg-4 col-md-6">
              <h4 className="text-light mb-4">Newsletter</h4>
              <p className="text-light">Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
              {message?<p className="text-light">{message}</p>:""}
              <div
                className="position-relative mx-auto"
                style={{ maxWidth: "450px" }}
              >
                <input
                  className="form-control bg-transparent w-100 py-3 ps-4 pe-5"
                  type="text"
                  placeholder="Your email"
                  onChange={(e)=>setEmail(e.target.value)}
                  
                />
                <button
                onClick={postData}
                  type="button"
                  className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Footer End --> */}
    </>
  );
}
