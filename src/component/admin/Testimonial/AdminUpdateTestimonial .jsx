import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import Formvalidators from "../../validators/Formvalidators";
import Imagevalidators from "../../validators/Imagevalidators";
import { getTestimonial } from "../../../Store/ActionCreators/TestimonialActionCreators";
import { updateTestimonial } from "../../../Store/ActionCreators/TestimonialActionCreators";
import { useDispatch, useSelector } from "react-redux";

export default function AdminUpdateTestimonial() {
  let {_id}=useParams()
//   let[Testimonial,setTestimonial]=useState([])
   let [allData,setAllData]= useState([])
  let [data, setData] = useState({
    name: "",
    pic:"",
    message:"",
    active: true,
  });

  let [errorMessage, setErrorMessage] = useState({
    name:"",
    pic:"",
    message:"",
  });
  let [show, setShow] = useState(false);

  let navigate = useNavigate();
  let dispatch= useDispatch()
  let TestimonialStateData=useSelector((state)=>state.TestimonialStateData)

  function getInputData(e) {
    let name = e.target.name;
    let value = e.target.files ?e.target.files[0] : e.target.value ;
    if (name!=="active"){
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
      
      let item = TestimonialStateData.find((x)=> x.name.toLowerCase() === data.name.toLowerCase());
      if (item && item._id!==_id) {
        setShow(true);
        setErrorMessage((old)=>{
          return {
            ...old,
            name:"Testimonial Name is Already Exist"
          }
        });
      } 
      else {
  
      // dispatch(updateTestimonial({...data}))
      let formData = new FormData()
      formData.append("_id" , data._id)
      formData.append("name" , data.name)
      formData.append("pic" , data.pic)
      formData.append("message" , data.message)
      formData.append("active" , data.active)
      dispatch(updateTestimonial(formData))
        navigate("/admin/testimonial")
      }

    }
  }

  useEffect(()=>{
    (()=>{
     
      dispatch(getTestimonial())
           if(TestimonialStateData.length){
                setAllData(TestimonialStateData)
                setData(TestimonialStateData.find((x)=>x._id === _id))    
         }
         else
         setAllData([])
          })()
    
   },[TestimonialStateData.length])

  return (
    <>
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-md-3">
            <Sidebar />
          </div>

          <div className="col-md-9">
            <h5 className="bg-primary p-2 text-center text-light">
              Testimonial
              <Link to="/admin/testimonial">
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
                    placeholder="Testimonial Name"
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

              <div className="mb-3">
        <label>Message*</label>
<textarea name="message" onChange={getInputData} value={data.message}
 placeholder="Message..." className='form-control border-primary border-2' 
 rows={3} id=""></textarea>

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
