import "./login.css";
export const Login = () => {
  return (
    <div className="body-register-login">
      <div class="login-register">
        <h2>Log In</h2>
        <form action="#">
          <div class="form-control">
            <input type="text" required />
            <label>Email</label>
          </div>
          <div class="form-control">
            <input type="password" required />
            <label>Password</label>
          </div>
          <button type="submit">Log In</button>
        </form>
        <p>
          New to ##? <a href="#">Register now</a>
        </p>
      </div>
    </div>
  );
};
