import React, { useState } from 'react'
import Formvalidators from './validators/Formvalidators'
import { Link, useNavigate } from 'react-router-dom'
import { AddLink } from '@mui/icons-material'
export default function Login() {
    let [data,setData] =useState({
        username:"",
        password:"",
    
        
    })
    let [show ,setShow] = useState(false)
    let [errorMessage,setErrorMessage]=useState({
        username:"User Name Field is Mandatory",
        password:"Password Field is Mandatory",
    })
    let navigate =useNavigate()

    function getInputData(e){
           var{name,value}=e.target
           setErrorMessage((old)=>{
            return {
                ...old,
                [name]:Formvalidators(e)
            }
           })

           setData((old)=>{
            return {
                ...old,
                [name]:value
            }
           })

        }


   async     function postData(e){
            e.preventDefault()
          let error=Object.values(errorMessage).find((x)=>x!=="")
          if(!error){
              let resposne = await fetch("/user",{
                method:"GET",
                headers:{
                    "content-type":"application/json"
               }
            })
            resposne=await resposne.json()
             let item = resposne.find((x)=>x.username===data.username && x.password===data.password)
            if(item){
             localStorage.setItem("login",true)
             localStorage.setItem("name",item.name)
             localStorage.setItem("userid",item.id)
             localStorage.setItem("role",item.role)
             if(item.role==="Admin")
                navigate("/admin")
            else
            navigate("/profile")
            }
         else{
          setShow(true)
           setErrorMessage((old)=>{
            return{
                ...old,
                username:"Invalid Username or Password"
            }
           }) 
        
          }
        }
        else
        setShow(true)
   }
  return (
    <>
    <div className="container-fluid my-3">
          <div className="row">
            <div className="col-md-6 col-sm-8 col-10 m-auto">
                <h5 className='bg-primary p-2 text-light text-center'>Login to Your Account</h5>
          <form onSubmit={postData}>
               <div className="row">
                <div className="mb-3">
    <input type="text" name='username' className='form-control border-primary border-2' onChange={getInputData} placeholder='User Name'/>
                {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p>:""}
                </div>
                
               </div>

                <div className="mb-3">
  <input type="password" name='password' className='form-control border-primary border-2' onChange={getInputData} placeholder='Password'/>
                {show && errorMessage.password ? <p className='text-danger'>{errorMessage.password}</p>:""}
                </div>
                
               <div className="mb-3">
                <button type='submit' className='btn btn-primary w-100'>Login</button>
               </div>
          </form>
          <div className="d-flex justify-content-between">
          <Link to="#">Forget Password </Link>
          <Link to="/signup">Don't have an Account?Create </Link>
          </div>
          
            </div>
          </div>
    </div>
    </>
  )
}