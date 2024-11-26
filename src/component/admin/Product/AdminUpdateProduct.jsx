import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import Formvalidators from "../../validators/Formvalidators";
import Imagevalidators from "../../validators/Imagevalidators";

import { getProduct,updateProduct } from "../../../Store/ActionCreators/ProductActionCreators";
import { getMaincategory } from "../../../Store/ActionCreators/MaincategoryActionCreators";
import { getSubcategory } from "../../../Store/ActionCreators/SubcategoryActionCreators";
import { getBrand } from "../../../Store/ActionCreators/BrandActionCreators";

import { useDispatch, useSelector } from "react-redux";
let rte;

export default function AdminUpdateProduct() {
  let refdiv = useRef(null)
  let {id} =useParams()
  let [flag,setFlag] =useState(false)
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
    quantity: 0,
    description: "",
    pic: [],
    active: true,
  });

  let [errorMessage, setErrorMessage] = useState({
    name: "",
    color: "",
    size: "",
    basePrice: "",
    discount: "",
    quantity: "",
    pic: "",
  });
  let [show, setShow] = useState(false);

  let navigate = useNavigate();
  let dispatch = useDispatch();

  let ProductStateData = useSelector((state) => state.ProductStateData);
  let MaincategoryStateData = useSelector((state) => state.MaincategoryStateData);
  let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData);
  let BrandStateData = useSelector((state) => state.BrandStateData);
  function getInputData(e) {
    // console.log(e.target.files);
    let name = e.target.name;
    let value = e.target.files ? data.pic.concat(Array.from(e.target?.files).map((item)=> "/products/" + item.name)): e.target.value;
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
  console.log(errorMessage);
    e.preventDefault();
    let error = Object.values(errorMessage).find((x) => x.length > 0);
    if (error) setShow(true);
    else {
      dispatch(updateProduct({
         ...data,
        maincategory:data.maincategory || MaincategoryStateData[0].name,
        subcategory:data.subcategory || SubcategoryStateData[0].name,
        brand:data.brand || BrandStateData[0].name,
        basePrice:parseInt(data.basePrice),
        discount:parseInt(data.discount),
        finalPrice:parseInt(data.basePrice-data.basePrice*data.discount/100),
        quantity:parseInt(data.quantity),
        description:rte.getHTMLCode()
        }));
      navigate("/admin/product");
    }
  }

  useEffect(() =>{
    rte = new window.RichTextEditor(refdiv.current);
    rte.setHTMLCode("");
  },[])




  useEffect(() => {
    (() => {
      dispatch(getMaincategory());
    })();
  }, [MaincategoryStateData.length]);

  useEffect(() => {
    (() => {
      dispatch(getSubcategory());
    })();
  }, [SubcategoryStateData.length]);

  useEffect(() => {
    (() => {
      dispatch(getBrand());
    })();
  }, [BrandStateData.length]);

  useEffect(()=>{
    (()=>{
      dispatch(getProduct())
      if(ProductStateData.length){
        let item =ProductStateData.find((x)=>x.id===id)
        setData({...item})
    rte.setHTMLCode(item.description);

      }
    })()
  },[ProductStateData.length])
  return (
    <>
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-md-3">
            <Sidebar />
          </div>

          <div className="col-md-9">
            <h5 className="bg-primary p-2 text-center text-light">
              Product
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
                  value={data.name}
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
                  value={data.maincategory}

                    className="form-select border-primary border-2"
                  >
                    {MaincategoryStateData.map((item, index) => {
                      return (
                        <option key={index} value={item.name}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="col-md-3 col-sm-6 mb-3">
                  <label>Subcategory</label>
                  <select
                    name="subcategory"
                    onChange={getInputData}
                  value={data.subcategory}

                    className="form-select border-primary border-2"
                  >
                    {SubcategoryStateData.map((item, index) => {
                      return (
                        <option key={index} value={item.name}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                  <label>Brand*</label>
                  <select
                    name="brand"
                    onChange={getInputData}
                  value={data.brand}

                    className="form-select border-primary border-2"
                  >
                    {BrandStateData.map((item, index) => {
                      return (
                        <option key={index} value={item.name}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                  <label>Stock*</label>
                  <select
                    name="stock"
                    onChange={getInputData}
                  value={data.stock}

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
                  value={data.color}

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
                  value={data.size}

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
                  value={data.basePrice}

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
                  value={data.discount}

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
                  <label>Pic</label>
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
<label>Click on Image to Remove Old Image</label><br />
{
  data.pic?.map((item,index)=>{
    return <img src={item} height={50} width={50}  alt="image" key={index} onClick={()=>{
      data.pic.splice(index,1)
      setFlag(!flag)
    }} />
  })
}

</div>
               
              </div>

              <div className="row">
              <div className="col-md-6 mb-3">
                  <label>Stock Quantity*</label>
                  <input
                    type="number"
                    name="quantity"
                  value={data.quantity}

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
                <div className="col-md-6 mb-3">
                  <label>Active*</label>
                  <select
                    onChange={getInputData}
                    name="active"
                  value={data.active}

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
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}