import "./App.css";
import { Routes as Router, Route } from "react-router-dom";
import { Login, Main } from "./pages/";

export const App = () => {
  return (
    <Router>
      <Route exact path="/" element={<Main />} />
      <Route exact path="/login" element={<Login />} />
    </Router>
  );
};
