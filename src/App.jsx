import "./App.css";
import { Routes as Router, Route, Link } from "react-router-dom";
import { Login, Main, Register } from "./pages/";

export const App = () => {
  return (
    <Router>
      <Route exact path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/users"
        element={
          <h1>
            <Link to="/">HOME</Link>
          </h1>
        }
      />
    </Router>
  );
};
