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
  const imageRef = useRef(null);

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

  const handleChangeFileInput = () => {
    let doc = document.querySelector(".login-register-label");
    console.log(doc);
    if (imageRef.current.files[0]) {
      doc.textContent = imageRef.current.files[0].name;
    } else {
      doc.innerHTML = `<MdOutlineAddPhotoAlternate className="FormCreatePost__file-label-icon" />
        Choose a Photo`;
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (!imageRef.current.files[0]) {
      errorNotify("You must choose a Photo");
      return;
    }

    let first_name = firstNameRef.current.value;
    let last_name = lastNameRef.current.value;
    let email = emailRef.current.value;
    let username = usernameRef.current.value;
    let password = passwordRef.current.value;

    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("image", imageRef.current.files[0]);

    axiosInstance
      .post("/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((data) => {
        successNotify("You are register! 🎉🎉🎉");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      })
      .catch((error) => {
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
          <input
            type="file"
            id="inputField"
            ref={imageRef}
            name="image"
            className="login-register-file"
            onChange={handleChangeFileInput}
            accept="image/*"
          />
          <label htmlFor="inputField" className="login-register-label">
            Choose a Photo
          </label>
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
