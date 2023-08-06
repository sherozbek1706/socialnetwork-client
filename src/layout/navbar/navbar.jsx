import "./navbar.css";
import { AiFillHome, AiOutlineUserAdd, AiFillPlusSquare } from "react-icons/ai";
import { HiDocumentText } from "react-icons/hi";
import { FaUsers } from "react-icons/fa";
import { BiSolidLogIn, BiLogOut } from "react-icons/bi";
import { BsPlusSquareFill } from "react-icons/bs";
import { SiYoutubestudio } from "react-icons/si";
import { CgProfile } from "react-icons/cg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userToken = localStorage.getItem("token") || "";
  const handleLogOut = () => {
    localStorage.clear();

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
      window.location.assign("/");
    }, 1500);
  };

  return (
    <div className="Navbar">
      <h1 className="Navbar__logo">My Projects</h1>
      <div className="Navbar__nav">
        <Link
          to="/"
          className={`Navbar__link + ${
            location.pathname == "/" ? "active" : ""
          }`}
        >
          <AiFillHome className="nav__icon" />
          Home
        </Link>
        {/* <a href="#" className="Navbar__link">
          <HiDocumentText className="nav__icon" />
          Posts
        </a> */}
        <Link to="/top" className="Navbar__link">
          <SiYoutubestudio className="nav__icon" />
          Top Posts
        </Link>
        <Link to="/users" className="Navbar__link">
          <FaUsers className="nav__icon" />
          Users
        </Link>

        {userToken ? (
          <>
            <Link
              to="/create-post"
              className={`Navbar__link + ${
                location.pathname == "/create-post" ? "active" : ""
              }`}
            >
              <AiFillPlusSquare className="nav__icon" />
              Create post
            </Link>
            <Link
              to="/profile"
              className={`Navbar__link + ${
                location.pathname == "/profile" ? "active" : ""
              }`}
            >
              <CgProfile className="nav__icon" />
              Profile
            </Link>
            <Link
              to="/"
              onClick={handleLogOut}
              className="Navbar__link Navbar__logout"
            >
              <BiLogOut className="nav__icon" />
              Log Out
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="Navbar__link">
              <BiSolidLogIn className="nav__icon" />
              Sign in
            </Link>
            <Link to="/register" className="Navbar__link">
              <AiOutlineUserAdd className="nav__icon" />
              Sign up
            </Link>
          </>
        )}
        {/* <Link
          to="/"
          onClick={handleLogOut}
          className="Navbar__link Navbar__logout"
        >
          <BiLogOut className="nav__icon" />
          Log Out
        </Link> */}
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
