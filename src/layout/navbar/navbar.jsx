import "./navbar.css";
import { AiFillHome, AiOutlineUserAdd } from "react-icons/ai";
import { HiDocumentText } from "react-icons/hi";
import { FaUsers } from "react-icons/fa";
import { BiSolidLogIn, BiLogOut } from "react-icons/bi";
import { ImProfile } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
export const Navbar = () => {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("token") || "";

  const handleLogOut = () => {
    localStorage.removeItem("token");

    toast.warn("You are Log Out!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="Navbar">
      <h1 className="Navbar__logo">My Projects</h1>
      <div className="Navbar__nav">
        <Link to="/" className="Navbar__link">
          <AiFillHome className="nav__icon" />
          Home
        </Link>
        {/* <a href="#" className="Navbar__link">
          <HiDocumentText className="nav__icon" />
          Posts
        </a> */}
        <Link to="/users" className="Navbar__link">
          <FaUsers className="nav__icon" />
          Users
        </Link>
        {userToken ? (
          <>
            <Link to="/profile" className="Navbar__link">
              <ImProfile className="nav__icon" />
              Profile
            </Link>
            <Link to="/" onClick={handleLogOut} className="Navbar__link">
              <BiLogOut className="nav__icon" />
              Log Out
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="Navbar__link">
              <BiSolidLogIn className="nav__icon" />
              Login
            </Link>
            <Link to="/register" className="Navbar__link">
              <AiOutlineUserAdd className="nav__icon" />
              Register
            </Link>
          </>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
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
