import React from 'react'
import { Link } from 'react-router-dom'

export default function Aboutcontent() {
  return (
    <>
     {/* <!-- About Start --> */}
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
            <div
              className="position-relative overflow-hidden ps-5 pt-5 h-100"
              style={{minHeight:"400px"}}
            >
              <img
                className="position-absolute w-100 h-100"
                src="img/h.jpg"
                alt=""
                style={{objectFit:"cover"}}
              />
              <div
                className="position-absolute top-0 start-0 bg-white pe-3 pb-3"
                style={{width:"200px", height:"200px"}}
              >
                <div
                  className="d-flex flex-column justify-content-center text-center bg-primary h-100 p-3"
                >
                  <h1 className="text-white">10000+</h1>
                  <h2 className="text-white">Happy</h2>
                  <h5 className="text-white mb-0">Costumers</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
            <div className="h-100">
              <div className="border-start border-5 border-primary ps-4 mb-5">
                <h6 className="text-body text-uppercase mb-2">About Us</h6>
                <h1 className="display-6 mb-0">
                  100+ Geniune Products & Top Brands
                </h1>
              </div>
              <p>
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
                sed stet lorem sit clita duo justo magna dolore erat amet
              </p>
              <p className="mb-4">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
                sed stet lorem sit clita duo justo magna dolore erat amet
              </p>
              <div className="border-top mt-4 pt-4">
                <div className="row g-4">
                  <div className="col-sm-4 d-flex wow fadeIn" data-wow-delay="0.1s">
                    <i
                      className="fa fa-check fa-2x text-primary flex-shrink-0 me-3"
                    ></i>
                    <h6 className="mb-0">Ontime at services</h6>
                  </div>
                  <div className="col-sm-4 d-flex wow fadeIn" data-wow-delay="0.3s">
                    <i
                      className="fa fa-check fa-2x text-primary flex-shrink-0 me-3"
                    ></i>
                    <h6 className="mb-0">24/7 hours services</h6>
                  </div>
                  <div className="col-sm-4 d-flex wow fadeIn" data-wow-delay="0.5s">
                    <i
                      className="fa fa-check fa-2x text-primary flex-shrink-0 me-3"
                    ></i>
                    <h6 className="mb-0">Verified professionals</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* <!-- About End --> */}

    {/* <!-- Facts Start --> */}
    <div className="container-fluid my-5 p-0">
      <div className="row g-0">
        <div className="col-xl-3 col-sm-6 wow fadeIn" data-wow-delay="0.1s">
          <div className="position-relative">
            <img className="img-fluid w-100" src="img/p.jpeg" style={{height:350,width:"100%"}} alt="" />
            <div className="facts-overlay">
              <h1 className="display-1">01</h1>
              <h4 className="text-white mb-3">Top Brands</h4>
              <p className="text-white">
               Adidas Nike Puma Sata Campus US PoLo Zara Gucci Tommy 
              </p>
<Link className="text-white small text-light" to="/shop">Buy Now<i className="fa fa-arrow-right  ms-3"></i></Link>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 wow fadeIn" data-wow-delay="0.3s">
          <div className="position-relative">
          <img className="img-fluid w-100" src="img/p2.jpeg" style={{height:350,width:"100%"}} alt="" />
            <div className="facts-overlay">
              <h1 className="display-1">02</h1>
              <h4 className="text-white mb-3">Latest Fashion</h4>
              <p className="text-white">
                Aliqu diam amet diam et eos erat ipsum lorem stet lorem sit
                clita duo justo erat amet
              </p>
              <Link className="text-white small text-light" to="/shop">Buy Now<i className="fa fa-arrow-right  ms-3"></i></Link>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 wow fadeIn" data-wow-delay="0.5s">
          <div className="position-relative">
          <img className="img-fluid w-100" src="img/p3.jpeg" style={{height:350,width:"100%"}} alt="" />
            <div className="facts-overlay">
              <h1 className="display-1">03</h1>
              <h4 className="text-white mb-3">Fast Delivery</h4>
              <p className="text-white">
                Aliqu diam amet diam et eos erat ipsum lorem stet lorem sit
                clita duo justo erat amet
              </p>
              <Link className="text-white small text-light" to="/shop">Buy Now<i className="fa fa-arrow-right  ms-3"></i></Link>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 wow fadeIn" data-wow-delay="0.7s">
          <div className="position-relative">
          <img className="img-fluid w-100" src="img/p4.jpeg" style={{height:350,width:"100%"}} alt="" />
            <div className="facts-overlay">
              <h1 className="display-1">04</h1>
              <h4 className="text-white mb-3">7 Days</h4>
              <p className="text-white">
                Aliqu diam amet diam et eos erat ipsum lorem stet lorem sit
                clita duo justo erat amet
              </p>
              <Link className="text-white small text-light" to="/shop">Buy Now<i className="fa fa-arrow-right  ms-3"></i></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* <!-- Facts End --> */}

    
    </>
  )
}
