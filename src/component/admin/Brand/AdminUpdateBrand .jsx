import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import Formvalidators from "../../validators/Formvalidators";
import Imagevalidators from "../../validators/Imagevalidators";
import { getBrand,updateBrand, } from "../../../Store/ActionCreators/BrandActionCreators";
import { useDispatch, useSelector } from "react-redux";

export default function AdminUpdateBrand() {
  let {id}=useParams()
  // let[Brand,setBrand]=useState([])

  let [data, setData] = useState({
    name: "",
    pic:"",
    active: true,
  });

  let [errorMessage, setErrorMessage] = useState({
    name:"",
    pic:""
  });
  let [show, setShow] = useState(false);

  let navigate = useNavigate();
  let dispatch=useDispatch()
  let BrandStateData=useSelector((state)=>state.BrandStateData)

  function getInputData(e) {
    let name = e.target.name;
    let value = e.target.files ?"/brands/"+e.target.files[0].name : e.target.value ;
    if (name === "name" || name === "pic"){
      setErrorMessage((old)=>{
        return{
          ...old,
          [name]:e.target.files ? Imagevalidators(e) : Formvalidators(e)
        }
        })
    }
     
    
       setData((old) => {
      return {
        ...old,
        [name]: name === "active" ? (value === "true" ? true : false) : value,
      }
    })
  }
  function postData(e) {
    e.preventDefault();
    let error = Object.values(errorMessage).find((x)=>x.length > 0)
    if (error)
      setShow(true);
    else {
      
      let item = BrandStateData.find((x)=> x.name.toLowerCase() === data.name.toLowerCase());
      if (item && item.id!==id) {
        setShow(true);
        setErrorMessage((old)=>{
          return {
            ...old,
            name:"Brand Name is Already Exist"
          }
        });
      } 
      else {
  
      dispatch(updateBrand({...data}))
        navigate("/admin/brand")
      }

    }
  }

  useEffect(()=>{
    (()=>{
     
      dispatch(getBrand())
      if(BrandStateData.length){
        let item =BrandStateData.find((x)=>x.id===id)
        if(item){
         setData({...item})
      
      }
    }
     })()
    
   },[BrandStateData.length])

  return (
    <>
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-md-3">
            <Sidebar />
          </div>

          <div className="col-md-9">
            <h5 className="bg-primary p-2 text-center text-light">
              Brand
              <Link to="/admin/brand">
                <i className="fa fa-backward text-light float-end"></i>
              </Link>
            </h5>

            {/* form */}
            <form onSubmit={postData}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Brand*</label>
                  <input
                    type="text"
                    value={data.name}
                    name="name"
                    onChange={getInputData}
                    className="form-control border-primary border-2"
                    id=""
                    placeholder="Brand Name"
                  />
                  {show && errorMessage.length ? (
                    <p className="text-danger text-capitalize">
                      {errorMessage}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label>Pic</label>
                <input type="file" name="pic" onChange={getInputData} className='form-control border-primary border-2' />
                {show && errorMessage.pic ? 
                    <p className="text-danger text-capitalize">
                      {errorMessage.pic}
                    </p>
                   : 
                    ""
                  }
                </div>
              </div>
             <div className="row">
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