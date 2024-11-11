import React, { useEffect } from 'react'
import Testimonial from './partials/Testimonial'
import Aboutcontent from './partials/Aboutcontent'
import Product from './partials/Products'
import { Link } from 'react-router-dom'
import {getProduct} from "../Store/ActionCreators/ProductActionCreators"
import {getMaincategory} from "../Store/ActionCreators/MaincategoryActionCreators"
import { useDispatch, useSelector } from 'react-redux'

export default function Home() {
  let dispatch = useDispatch()
  let ProductStateData=useSelector((state)=>state.ProductStateData)
  let MaincategoryStateData=useSelector((state)=>state.MaincategoryStateData)
 
 useEffect(()=>{
  (()=>{
    dispatch(getMaincategory())
  })()
 },[MaincategoryStateData.length])

 useEffect(()=>{
  (()=>{
    dispatch(getProduct())
  })()
 },[ProductStateData.length])
 
  return (
    <>
    {/* <!-- Carousel Start --> */}
    <div className="container-fluid p-0  wow fadeIn" data-wow-delay="0.1s">
      <div id="header-carousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="w-100" src="img/carousel-1.jpg" style={{height:500}} alt="Image" />
            <div className="carousel-caption">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12 col-lg-10">
  <h6 className="text-light text-uppercase mb-3 animated slideInDown"> Welcome to ecoApp </h6>
<h5 className="display-2 text-light mb-3 animated slideInDown">Latest And Branded Product For Men </h5>
                    <ol className="breadcrumb mb-4 pb-2">
                      <li className="breadcrumb-item fs-5 text-light"> Jeans</li>
                      <li className="breadcrumb-item fs-5 text-light"> Shirts</li>
                      <li className="breadcrumb-item fs-5 text-light"> Trousers</li>
                      <li className="breadcrumb-item fs-5 text-light"> More</li>
                    </ol>
       <Link to="/shop?mc=Men" className="btn btn-primary py-3 px-5">Shop Now</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img className="w-100" src="img/carousel-2.jpg" style={{height:500}} alt="Image" />
            <div className="carousel-caption">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12 col-lg-10">
<h6 className="text-light text-uppercase mb-3 animated slideInDown" >   Welcome to ecoApp </h6>
                    <h5 className="display-2 text-light mb-3 animated slideInDown ">
                    Latest And Branded Product For Women   </h5>
                 
                  <ol className="breadcrumb mb-4 pb-2">
                      <li className="breadcrumb-item fs-5 text-light"> Jeans</li>
                      <li className="breadcrumb-item fs-5 text-light"> Shirts</li>
                      <li className="breadcrumb-item fs-5 text-light"> Trousers</li>
                      <li className="breadcrumb-item fs-5 text-light"> More</li>
                    </ol>
                  
   <Link to="/shop?mc=Female" className="btn btn-primary py-3 px-5">Shop Now</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#header-carousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#header-carousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    {/* <!-- Carousel End --> */}

     {
      MaincategoryStateData.length && ProductStateData.length  && MaincategoryStateData.map((item,index)=>{
 
  return  <Product key={index} data={ProductStateData.filter((x)=>x.maincategory===item.name).slice(0,36)} title={item.name}/>
      })
     }

  <Aboutcontent/>
  <Product title={'All category'} data={ProductStateData.slice(0,36)} />
  <Testimonial/>
    </>
  )
  
}