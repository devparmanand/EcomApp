import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import Formvalidators from "../../validators/Formvalidators";
import { getSubcategory,updateSubcategory, } from "../../../Store/ActionCreators/SubcategoryActionCreators";
import { useDispatch, useSelector } from "react-redux";

export default function AdminUpdateSubcategory() {
let {_id} = useParams
  // let[Subcategory,setSubcategory]=useState([])

  let [data, setData] = useState({
    name: "",
    active: true,
  });

  let [errorMessage, setErrorMessage] = useState({
    name:""
  });
  let [show, setShow] = useState(false);

  let navigate = useNavigate();
  let dispatch=useDispatch()
  let SubcategoryStateData=useSelector((state)=>state.SubcategoryStateData)

  function getInputData(e) {
    let { name, value } = e.target;
    if (name === "name")
   setErrorMessage(Formvalidators(e));
     setData((old) => {
      return {
        ...old,
        [name]: name === "active" ? (value === "true" ? true : false) : value
      }
    })
  }

  function postData(e) {
    e.preventDefault();
    if (errorMessage.length) 
      setShow(true);
    else {
      
      let item = SubcategoryStateData.find((x)=> x.name.toLowerCase() === data.name.toLowerCase());
      if (item && item._id!==_id) {
        setShow(true);
        setErrorMessage("Subcategory Name is Already Exist");
      } 
      else {
  
      dispatch(updateSubcategory({...data}))
      console.log(SubcategoryStateData);
      
        navigate("/admin/subcategory")
      }

    }
  }

  useEffect(()=>{
    (()=>{
     
      dispatch(getSubcategory())
      if(SubcategoryStateData.length){
        let item =SubcategoryStateData.find((x)=>x._id===_id)
        if(item){
         setData({...item})
      
      }
    }
     })()
    
   },[SubcategoryStateData.length])

  return (
    <>
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-md-3">
            <Sidebar />
          </div>

          <div className="col-md-9">
            <h5 className="bg-primary p-2 text-center text-light">
              Subcategory
              <Link to="/admin/subcategory">
                <i className="fa fa-backward text-light float-end"></i>
              </Link>
            </h5>

            {/* form */}
            <form onSubmit={postData}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Name*</label>
                  <input
                    type="text"
                    value={data.name}
                    name="name"
                    onChange={getInputData}
                    className="form-control border-primary border-2"
                    id=""
                    placeholder="Subcategory Name"
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
