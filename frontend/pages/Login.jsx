import React from "react";
import axios, { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../src/util";

function login() {
  const Navigate = useNavigate();
  async function handelsubmitlogin(e) {
    e.preventDefault();
    const userData = {
    
      email: e.target[0].value,
      password: e.target[1].value,
    };

    const {  email, password } = userData;
    if ( !email || !password) {
      return handleError("All fields are required");
    }

    try {
      const res = await axios.post(
        "http://localhost:5500/auth/login",
        userData
      );
      const { success, message,jwttoken,name } = res.data;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwttoken);
        localStorage.setItem("LoggedInUser",name)
        setTimeout(() => {
          Navigate("/home");
        }, 1000);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // ✅ Safely extract validation message
        const serverMessage =
          error.response?.data?.details || // e.g., name length issue
          error.response?.data?.message || // general error message
          "Something went wrong"; // fallback

        handleError(serverMessage); // show toast
      }
    }
  }

  return (
    <div className="container">
      <h2>login</h2>
      <form onSubmit={handelsubmitlogin}>
        
        <div className="email">
          <label htmlFor="email" className="form-label">
            User email address
          </label>
          <br />
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="enter user email"
          />
        </div>
        <div className="password">
          <label htmlFor="password" className="form-label">
            User Password
          </label>
          <br />
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="enter user password"
          />
        </div>
        <button type="submit" className="btn">
          Login
        </button>
      </form>
      <span>
        dont  have a account ?<Link to="/singup">singup</Link>
      </span>
      <ToastContainer />
    </div>
  );
}

export default login;
