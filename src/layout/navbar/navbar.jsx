import "./navbar.css";
import { AiFillHome, AiOutlineUserAdd } from "react-icons/ai";
import { HiDocumentText } from "react-icons/hi";
import { FaUsers } from "react-icons/fa";
import { BiSolidLogIn, BiLogOut } from "react-icons/bi";
import { ImProfile } from "react-icons/im";
import { Link } from "react-router-dom";
export const Navbar = () => {
  const userToken = localStorage.getItem("token") || "";

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
        <a href="#" className="Navbar__link">
          <FaUsers className="nav__icon" />
          Users
        </a>
        {userToken ? (
          <>
            <Link to="/profile" className="Navbar__link">
              <ImProfile className="nav__icon" />
              Profile
            </Link>
            <Link to="/logout" className="Navbar__link">
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
    </div>
  );
};
