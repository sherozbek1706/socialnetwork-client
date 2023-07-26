import { Link } from "react-router-dom";
import "../login/login.css";
export const Register = () => {
  return (
    <div className="body-register-login">
      <div className="login-register">
        <h2>Register</h2>
        <form action="#">
          <div className="form-control">
            <input type="text" required />
            <label>First name</label>
          </div>
          <div className="form-control">
            <input type="text" required />
            <label>Last name</label>
          </div>
          <div className="form-control">
            <input type="text" required />
            <label>Username</label>
          </div>
          <div className="form-control">
            <input type="text" required />
            <label>Email</label>
          </div>
          <div className="form-control">
            <input type="password" required />
            <label>Password</label>
          </div>
          <button type="submit">Register</button>
        </form>
        <p>
          Do you have account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};
