import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../Sidebar";
import { Link, useNavigate } from "react-router-dom";
import Formvalidators from "../../validators/Formvalidators";
import Imagevalidators from "../../validators/Imagevalidators";

import { createProduct } from "../../../Store/ActionCreators/ProductActionCreators";
import { getMaincategory } from "../../../Store/ActionCreators/MaincategoryActionCreators";
import { getSubcategory } from "../../../Store/ActionCreators/SubcategoryActionCreators";
import { getBrand } from "../../../Store/ActionCreators/BrandActionCreators";
import { useDispatch, useSelector } from "react-redux";
let rte;

export default function AdminCreateProduct() {
  let [maincategory , setMaincategory] = useState([])
  let [subcategory , setSubcategory] = useState([])
  let [brand , setBrand] = useState([])
  let refdiv = useRef(null)
  let [data, setData] = useState({
    name: "",
    maincategory: "",
    subcategory: "",
    brand: "",
    color: "",
    size: "",
    basePrice: 0,
    discount: 0,
    finalPrice: 0,
    stock: true,
    stockQuantity: 0,
    description: "",
    pic: "",
    active: true,
  });

  let [errorMessage, setErrorMessage] = useState({
    name: "Name Field is Mandatory",
    color: "Color Field is Mandatory",
    size: "Size Field is Mandatory",
    basePrice: "Base Price Field is Mandatory",
    discount: "Discount Field is Mandatory",
    stockQuantity: "Stock stockQuantity Field is Mandatory",
    pic: ["Pic Field is Mandatory"],
  });
  let [show, setShow] = useState(false);

  let navigate = useNavigate();
  let dispatch = useDispatch();

  let MaincategoryStateData = useSelector( (state) => state.MaincategoryStateData);
  let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData);
  let BrandStateData = useSelector((state) => state.BrandStateData);
  function getInputData(e) {
    // console.log(e.target.files);
    let name = e.target.name;
    // let value = e.target.files ? Array.from(e.target?.files).map((item)=> "/products/" + item.name): e.target.value;
    let value = e.target.files ? e.target?.files: e.target.value;
    if (name !=="active") {
      setErrorMessage((old) => {
        return {
          ...old,
          [name]: e.target.files ? Imagevalidators(e) : Formvalidators(e),
        };
      });
    }

    setData((old) => {
      return {
        ...old,
        [name]: name === "active" || name==="stock" ? (value === "true" ? true : false) : value,
      };
    });
  }
  function postData(e) {
    e.preventDefault();
    let error = Object.values(errorMessage).find((x) => x.length > 0);

    if (error) setShow(true);
    else {
      // dispatch(createProduct({
      //    ...data,
      //   maincategory:data.maincategory || MaincategoryStateData[0].name,
      //   subcategory:data.subcategory || SubcategoryStateData[0].name,
      //   brand:data.brand || BrandStateData[0].name,
      //   basePrice:
      //   discount:parseInt(data.discount),
      //   finalPrice:parseInt(data.basePrice-data.basePrice*data.discount/100),
      //   quantity:parseInt(data.quantity),
      //   description:rte.getHTMLCode()
      //   }));
        let basePrice = parseInt(data.basePrice)
        let discount = parseInt(data.discount)
        let finalPrice = parseInt(data.basePrice-data.basePrice*data.discount/100)

        let formData = new FormData()

        formData.append("name" , data.name)
        formData.append("maincategory" , data.maincategory === "" ? maincategory[0]._id : data.maincategory)
        formData.append("subcategory" , data.subcategory === "" ? subcategory[0]._id : data.subcategory)
        formData.append("brand" , data.brand === "" ? brand[0]._id : data.brand)
        formData.append("basePrice" , basePrice)
        formData.append("discount" , discount)
        formData.append("finalPrice" ,finalPrice)
        formData.append("stock" , data.stock)
        formData.append("size" , data.size)
        formData.append("color" , data.color)
        formData.append("stockQuantity" , data.stockQuantity)
        formData.append("description" , rte.getHTMLCode())
        Array.from(data.pic).forEach((p)=>{
              formData.append("pic" , p)
        })
        formData.append("active" , data.active) 

        dispatch(createProduct(formData))
      navigate("/admin/product");


    }
  } 

  useEffect(() =>{
    rte = new window.RichTextEditor(refdiv.current);
    rte.setHTMLCode("Hello World");
  },[])




  useEffect(() => {
    (() => {
      dispatch(getMaincategory())
      if(MaincategoryStateData.length)
        setMaincategory(MaincategoryStateData.filter((x)=>x.active === true))
      
    })();
  }, [MaincategoryStateData.length]);

  useEffect(() => {
    (() => {
      dispatch(getSubcategory())
      if(SubcategoryStateData.length)
        setSubcategory(SubcategoryStateData.filter((x)=>x.active === true))
    })();
  }, [SubcategoryStateData.length]);

  useEffect(() => {
    (() => {
      dispatch(getBrand())
      if(BrandStateData.length)
        setBrand(BrandStateData.filter((x)=>x.active === true))
      
    })();
  }, [BrandStateData.length]);
  return (
    <>
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-md-3">
            <Sidebar />
          </div>

          <div className="col-md-9">
            <h5 className="bg-primary p-2 text-center text-light">
          Admin Create  Product
              <Link to="/admin/product">
                <i className="fa fa-backward text-light float-end"></i>
              </Link>
            </h5>

            {/* form */}
            <form onSubmit={postData}>
              <div className="mb-3">
                <label>Name*</label>
                <input
                  type="text"
                  name="name"
                  onChange={getInputData}
                  className="form-control border-primary border-2"
                  id=""
                  placeholder="Product Name"
                />
                {show && errorMessage.name ? (
                  <p className="text-danger text-capitalize">
                    {" "}
                    {errorMessage.name}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="row">
                <div className="col-md-3 col-sm-6 mb-3">
                  <label>Maincategory*</label>
                  <select
                    name="maincategory"
                    onChange={getInputData}
                    className="form-select border-primary border-2"
                  >
                    {
                maincategory.map((item, index) => {
                      return  <option key={index} value={item._id}>{item.name}</option>
                    })}
                  </select>
                </div>

                <div className="col-md-3 col-sm-6 mb-3">
                  <label>Subcategory</label>
                  <select
                    name="Subcategory"
                    onChange={getInputData}
                    className="form-select border-primary border-2"
                  >
                    {
                    // subcategory.map((item, index) => {
                    //   return (
                    //     <option key={index} value={item.name}>
                    //       {item.name}
                    //     </option>
                    //   );
                  subcategory.map((item, index) => {
                      return  <option key={index} value={item._id}>{item.name}</option>
                      
                    })}
                  </select>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                  <label>Brand</label>
                  <select
                    name="brand"
                    onChange={getInputData}
                    className="form-select border-primary border-2"
                  >
                    {
                    // subcategory.map((item, index) => {
                    //   return (
                    //     <option key={index} value={item.name}>
                    //       {item.name}
                    //     </option>
                    //   );
                    brand.map((item, index) => {
                      return  <option key={index} value={item._id}>{item.name}</option>
                    })}
                  </select>
                </div>

                <div className="col-md-3 col-sm-6 mb-3">
                  <label>Stock*</label>
                  <select
                    name="stock"
                    onChange={getInputData}
                    className="form-select border-primary border-2"
                  >
                    <option value="true">In Stock</option>
                    <option value="false">Out of Stock</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Color*</label>
                  <input
                    type="text "
                    name="color"
                     onChange={getInputData}
                    placeholder="color"
                    className="form-control border-primary border-2"
                  />
                  {show && errorMessage.color ? (
                    <p className="text-danger text-capitalize">
                      {" "}
                      {errorMessage.color}
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Size*</label>
                  <input
                    type="text "
                    name="size"
                     onChange={getInputData}
                    placeholder="size"
                    className="form-control border-primary border-2"
                  />
                  {show && errorMessage.size ? (
                    <p className="text-danger text-capitalize">
                      {" "}
                      {errorMessage.size}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Base Price*</label>
                  <input
                    type="number"
                    name="basePrice"
                     onChange={getInputData}
                    placeholder="Base Price"
                    className="form-control border-primary border-2"
                  />
                  {show && errorMessage.basePrice ? (
                    <p className="text-danger text-capitalize">
                      {" "}
                      {errorMessage.basePrice}
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Discount*</label>
                  <input
                    type="number"
                    name="discount"
                     onChange={getInputData}
                    placeholder="Discount"
                    className="form-control border-primary border-2"
                  />
                  {show && errorMessage.discount ? (
                    <p className="text-danger text-capitalize">
                      {" "}
                      {errorMessage.discount}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="mb-3">
                <label>Description*</label>
               <div ref={refdiv}></div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Pic*</label>
                  <input
                    type="file"
                    name="pic"
                    multiple
                    onChange={getInputData}
                    className="form-control border-primary border-2"
                  />
                  {show && errorMessage.pic ? (
                    <p className="text-danger text-capitalize">
                      {errorMessage.pic}
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Stock Quantity*</label>
                  <input
                    type="number"
                    name="stockQuantity"
                    onChange={getInputData}
                    placeholder="Stock Quantity"
                    className="form-control border-primary border-2"
                  />
                  {show && errorMessage.quantity ? (
                    <p className="text-danger text-capitalize">
                      {errorMessage.quantity}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Active*</label>
                  <select
                    onChange={getInputData}
                    name="active"
                    className="form-select border-primary border-2"
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
              <div className=" mb-3">
                <button
                  type="submit"
                  className="btn btn-primary text-light text-center w-100"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
