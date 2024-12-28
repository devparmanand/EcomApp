import React, { useState } from "react";
import Formvalidators from "./validators/Formvalidators";
import { Link, useNavigate } from "react-router-dom";
// import { AddLink } from '@mui/icons-material'
export default function Signup() {
  let [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();
  let [show, setShow] = useState(false);
  let [errorMessage, setErrorMessage] = useState({
    name: "Name Field is Mandatory",
    username: "User Name Field is Mandatory",
    email: "Email Field is Mandatory",
    phone: "Phone Field is Mandatory",
    password: "Password Field is Mandatory",
    cpassword: "CPassword Field is Mandatory",
  });

  function getInputData(e) {
    var { name, value } = e.target;
    setErrorMessage((old) => {
      return {
        ...old,
        [name]: Formvalidators(e),
      };
    });

    setData((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }

  async function postData(e) {
    e.preventDefault();   
    if (data.password === data.cpassword) {
      let error = Object.values(errorMessage).find((x) => x !== "");
      if (error) 
        setShow(true)
      else{
        let   item = {
          name: data.name,
          username: data.username,
          email: data.email,
          phone: data.phone,
          password: data.password,
          role: "Buyer",
        }

        let   resposne = await fetch("/api/user", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(item),
        });
        resposne = await resposne.json();
        if (resposne.result==="Done"){
          localStorage.setItem("login", true)
          localStorage.setItem("name", resposne.data.name)
          localStorage.setItem("userid", resposne.data._id)
          localStorage.setItem("role", resposne.data.role)
          localStorage.setItem("token", resposne.token)
          navigate("/profile");
        }
          else{
            console.log(resposne);
                  setShow(true)
                 setErrorMessage((old)=>{
                  return{
                    ...old,
                    "username":resposne.reason?.username ?? "",
                    "email":resposne.reason?.email ?? "",
                    "password":resposne.reason?.password ?? "",
                  }
                 })
          }
      }
       
      
       
    } else {  
      setShow(true)
      setErrorMessage((old) => {
        return {
          ...old,
          'password': "Password and Confirm Password Doesn't Matched",
        }
      })
    }
  
}
  return (
    <>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-8 col-sm-9 col-11 m-auto">
            <h5 className="bg-primary p-2 text-light text-center">
              Craete a Free Account
            </h5>
            <form onSubmit={postData}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="name"
                    className="form-control border-primary border-2"
                    onChange={getInputData}
                    placeholder="Full Name"
                  />
                  {show && errorMessage.name ? (
                    <p className="text-danger">{errorMessage.name}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="username"
                    className="form-control border-primary border-2"
                    onChange={getInputData}
                    placeholder="User Name"
                  />
                  {show && errorMessage.username ? (
                    <p className="text-danger">{errorMessage.username}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control border-primary border-2"
                    onChange={getInputData}
                    placeholder="Email Address"
                  />
                  {show && errorMessage.email ? (
                    <p className="text-danger">{errorMessage.email}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="number"
                    name="phone"
                    className="form-control border-primary border-2"
                    onChange={getInputData}
                    placeholder="Phone Number"
                  />
                  {show && errorMessage.phone ? (
                    <p className="text-danger">{errorMessage.phone}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="password"
                    name="password"
                    className="form-control border-primary border-2"
                    onChange={getInputData}
                    placeholder="Password"
                  />
                  {show && errorMessage.password ? (
                    <p className="text-danger">{errorMessage.password}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="password"
                    name="cpassword"
                    className="form-control border-primary border-2"
                    onChange={getInputData}
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary w-100">
                  Signup
                </button>
              </div>
            </form>
            <Link to="/login">Already Have an Account?Login </Link>
          </div>
        </div>
      </div>
    </>
  );
}
