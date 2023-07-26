import "./navbar.css";
import { AiFillHome, AiOutlineUserAdd } from "react-icons/ai";
import { HiDocumentText } from "react-icons/hi";
import { FaUsers } from "react-icons/fa";
import { BiSolidLogIn } from "react-icons/bi";
export const Navbar = () => {
  return (
    <div className="Navbar">
      <h1 className="Navbar__logo">My Projects</h1>
      <div className="Navbar__nav">
        <a href="#" className="Navbar__link">
          <AiFillHome className="nav__icon" />
          Home
        </a>
        {/* <a href="#" className="Navbar__link">
          <HiDocumentText className="nav__icon" />
          Posts
        </a> */}
        <a href="#" className="Navbar__link">
          <FaUsers className="nav__icon" />
          Users
        </a>
        <a href="#" className="Navbar__link">
          <BiSolidLogIn className="nav__icon" />
          Login
        </a>
        <a href="#" className="Navbar__link">
          <AiOutlineUserAdd className="nav__icon" />
          Register
        </a>
      </div>
    </div>
  );
};
