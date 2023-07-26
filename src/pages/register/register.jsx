import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { axiosInstance } from "../../services";
import { ToastContainer, toast } from "react-toastify";
import "../login/login.css";
export const Register = () => {
  const navigate = useNavigate();

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const errorNotify = (msg) =>
    toast.error(msg, {
      position: "top-right",
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const successNotify = (msg) =>
    toast.success(msg, {
      position: "top-right",
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const handleRegister = (e) => {
    e.preventDefault();

    let first_name = firstNameRef.current.value;
    let last_name = lastNameRef.current.value;
    let email = emailRef.current.value;
    let username = usernameRef.current.value;
    let password = passwordRef.current.value;

    let registerUser = {
      first_name,
      last_name,
      email,
      username,
      password,
    };

    console.log(registerUser);
    axiosInstance
      .post("/register", registerUser)
      .then((data) => {
        successNotify("You are register! 🎉🎉🎉");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      })
      .catch((error) => {
        console.log(error.response.data.error);
        errorNotify(error.response.data.error);
      });
  };

  return (
    <div className="body-register-login">
      <div className="login-register">
        <h2>Register</h2>
        <form action="#" onSubmit={handleRegister}>
          <div className="form-control">
            <input type="text" ref={firstNameRef} required />
            <label>First name</label>
          </div>
          <div className="form-control">
            <input type="text" ref={lastNameRef} required />
            <label>Last name</label>
          </div>
          <div className="form-control">
            <input type="text" ref={emailRef} required />
            <label>Email</label>
          </div>
          <div className="form-control">
            <input type="text" ref={usernameRef} required />
            <label>Username</label>
          </div>
          <div className="form-control">
            <input type="password" ref={passwordRef} required />
            <label>Password</label>
          </div>
          <button type="submit">Register</button>
        </form>
        <p>
          Do you have account? <Link to="/login">Log In</Link>
        </p>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};
