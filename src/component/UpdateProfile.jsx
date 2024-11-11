import React, { useState } from "react";
import Formvalidators from "./validators/Formvalidators";
import Imagevalidators from "./validators/Imagevalidators";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import { AddLink } from '@mui/icons-material'
export default function UpdateProfile() {
  let [data, setData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pin: "",
    pic: "",
  });
  let navigate = useNavigate();
  let [show, setShow] = useState(false);
  let [errorMessage, setErrorMessage] = useState({
    name: "",
    phone: "",
    pic: "",
  });

  function getInputData(e) {
    let name = e.target.name
    let value = e.target.files? "/products/" + e.target.files[0].name: e.target.value;
    if (name !== "name" || name === "pic" || name === "phone") {
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
        [name]: name === "active" ? (value === "true" ? true : false) : value,
      };
    });
  }
  async function postData(e) {
    e.preventDefault();
     let resposne = await fetch("/user/"  + localStorage.getItem("userid"), {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    });
    resposne = await resposne.json();
    if (resposne) {
      if (localStorage.getItem("role" === "Admin"))
         navigate("/admin");
      else navigate("/profile");
    } else alert("Something Went Wrong");
  }

  useEffect(() => {
    (async () => {
      let response = await fetch("/user", {
        method: "get",
        headers: {
          "content-type": "application/json",
        },
      });
      response = await response.json();
      let item = response.find((x) => x.id === localStorage.getItem("userid"));
      if (item)
         setData({ ...data, ...item });
      else navigate("/login");
    })();
  }, []);
  return (
    <>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-8 col-sm-9 col-11 m-auto">
            <h5 className="bg-primary p-2 text-light text-center">
              Update Profile Details
            </h5>
            <form onSubmit={postData}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="name"
                    value={data.name}
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
                    type="number"
                    name="phone"
                    value={data.phone}
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
                <div className="mb-3">
                  <label>Address</label>
                  <textarea
                    name="address"
                    value={data.address}
                    onChange={getInputData}
                    placeholder="address..."
                    className="form-control border-primary border-2"
                  ></textarea>
                </div>

                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="city"
                    value={data.city}
                    className="form-control border-primary border-2"
                    onChange={getInputData}
                    placeholder="City"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="state"
                    value={data.state}
                    className="form-control border-primary border-2"
                    onChange={getInputData}
                    placeholder="State"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="number"
                    name="pin"
                    onChange={getInputData}
                    value={data.pin}
                    className="form-control border-primary border-2"
                    placeholder="Pin code"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="file"
                    name="pic"
                    onChange={getInputData}
                   className="form-control border-primary border-2"
                  />
                </div>
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary w-100">
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
