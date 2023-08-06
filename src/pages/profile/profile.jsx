import { ProfileUser } from "../../components";
import { Navbar } from "../../layout";
import "./profile.css";
export const Profile = () => {
  return (
    <div className="Profile">
      <Navbar />
      <ProfileUser />
    </div>
  );
};
