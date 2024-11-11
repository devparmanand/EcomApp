import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import Formvalidators from "../../validators/Formvalidators";
import { getMaincategory,updateMaincategory, } from "../../../Store/ActionCreators/MaincategoryActionCreators";
import { useDispatch, useSelector } from "react-redux";

export default function AdminUpdateMaincategory() {
  let {id}=useParams()
  // let[maincategory,setMaincategory]=useState([])

  let [data, setData] = useState({
    name: "",
    active: true,
  });

  let [errorMessage, setErrorMessage] = useState("");
  let [show, setShow] = useState(false);

  let navigate = useNavigate();
  let dispatch=useDispatch()
  let MaincategoryStateData=useSelector((state)=>state.MaincategoryStateData)

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
      
      let item = MaincategoryStateData.find((x)=> x.name.toLowerCase() === data.name.toLowerCase());
      if (item && item.id!==id) {
        setShow(true);
        setErrorMessage("Maincategory Name is Already Exist");
      } 
      else {
  
      dispatch(updateMaincategory({...data}))
        navigate("/admin/maincategory")
      }

    }
  }

  useEffect(()=>{
    (()=>{
     
      dispatch(getMaincategory())
      if(MaincategoryStateData.length){
        let item =MaincategoryStateData.find((x)=>x.id===id)
        if(item){
         setData({...item})
      
      }
    }
     })()
    
   },[MaincategoryStateData.length])

  return (
    <>
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-md-3">
            <Sidebar />
          </div>

          <div className="col-md-9">
            <h5 className="bg-primary p-2 text-center text-light">
              Maincategorty
              <Link to="/admin/maincategory">
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
                    placeholder="Maincategory Name"
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
