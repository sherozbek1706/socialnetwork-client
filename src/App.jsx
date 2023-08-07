import "./App.css";
import { Routes as Router, Route, Link } from "react-router-dom";
import { CreatePost, Login, Main, Profile, Register } from "./pages/";

export const App = () => {
  return (
    <div className="general">
      <Router>
        <Route exact path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route
          path="/users"
          element={
            <h1>
              <Link to="/">HOME</Link>
            </h1>
          }
        />
      </Router>
    </div>
  );
};
