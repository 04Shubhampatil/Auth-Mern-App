import React from "react";
import axios, { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../src/util";

function Singup() {
  const Navigate = useNavigate();
  async function handelsubmit(e) {
    e.preventDefault();
    const userData = {
      name: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
    };

    const { name, email, password } = userData;
    if (!name || !email || !password) {
      return handleError("All fields are required");
    }

    try {
      const res = await axios.post(
        "http://localhost:5500/auth/singup",
        userData
      );
      const { success, message, } = res.data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          Navigate("/login");
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
      <h2>Singup</h2>
      <form onSubmit={handelsubmit}>
        <div className="name">
          <label htmlFor="name" className="form-label">
            User name
          </label>
          <br />
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="enter user name"
          />
        </div>
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
          Singup
        </button>
      </form>
      <span>
        Alredy have a account ?<Link to="/login">login</Link>
      </span>
      <ToastContainer />
    </div>
  );
}

export default Singup;
