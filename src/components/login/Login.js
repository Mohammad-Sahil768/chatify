import React, { useState } from 'react'
import axios from 'axios';
import {useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';


function Login() {

let {register,handleSubmit, formState : {errors}} = useForm()
let [Err,setErr]=useState("");
const navigate = useNavigate();


let handleUserLogin=(userCredObj)=>{
  axios
      .post("http://localhost:5000/user-api/user-login", userCredObj)
      .then((res) => {
        if (res.data.success === true) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", res.data.user);
          setErr("");
          navigate("/Chatall");
        } else {
          setErr(res.data.message);
        }
      })
      .catch((error) => setErr(error.message));
  }





  return (
    <div className="add-user mt-5">
    {/* form submission error */}
    


    {/* add user form */}
    <div className="row">
      <div className="col-11 col-sm-8 col-md-6 mx-auto">
        <form onSubmit={handleSubmit(handleUserLogin)}>
          {/* username */}
          <div className="mb-3">
            <label htmlFor="name">Userame</label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="e.g. John"
              {...register("username", { required: true })}
            />
            {/* validation errors for name */}
            {errors.username?.type === "required" && (
              <p className="text-danger fw-bold fs-5">
                * Username is required
              </p>
            )}
          </div>
          {/* password */}
          <div className="mb-3">
            <label htmlFor="name">Password</label>
            <input
              type="password"
              placeholder="*********"
              id="password"
              className="form-control"
              {...register("password", { required: true })}
            />
            {/* validation errors for name */}
            {errors.password?.type === "required" && (
              <p className="text-danger fw-bold fs-5">
                * Password is required
              </p>
            )}
          </div>
          
         
         
         
          {/* submit button */}
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
  )

}

export default Login