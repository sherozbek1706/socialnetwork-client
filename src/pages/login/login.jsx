import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import "./login.css";
import { axiosInstance } from "../../services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Login = () => {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const navigate = useNavigate();

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

  const handleLogin = (e) => {
    e.preventDefault();

    let username = usernameRef.current.value;
    let password = passwordRef.current.value;

    let loginUser = {
      username,
      password,
    };

    console.log(loginUser);
    axiosInstance
      .post("/login", loginUser)
      .then((data) => {
        localStorage.setItem("token", data.data.token);
        successNotify("You are logged! 🎉🎉🎉");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
        errorNotify(error.response.data.error);
        // navigate("/register");
      });
  };

  return (
    <div className="body-register-login">
      <div className="login-register">
        <h2>Log In</h2>
        <form action="#" onSubmit={handleLogin}>
          <div className="form-control">
            <input type="text" ref={usernameRef} required />
            <label>Username</label>
          </div>
          <div className="form-control">
            <input type="password" ref={passwordRef} required />
            <label>Password</label>
          </div>
          <button type="submit">Log In</button>
        </form>
        <p>
          New to ##? <Link to="/register">Register now</Link>
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
