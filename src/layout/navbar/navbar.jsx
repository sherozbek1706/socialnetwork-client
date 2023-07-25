import "./navbar.css";

export const Navbar = () => {
  return (
    <div className="Navbar">
      <h1 className="Navbar__logo">My Projects</h1>
      <div className="Navbar__nav">
        <a href="#" className="Navbar__link">
          Home
        </a>
        <a href="#" className="Navbar__link">
          Posts
        </a>
        <a href="#" className="Navbar__link">
          Users
        </a>
        <a href="#" className="Navbar__link">
          Login
        </a>
        <a href="#" className="Navbar__link">
          Register
        </a>
      </div>
    </div>
  );
};
