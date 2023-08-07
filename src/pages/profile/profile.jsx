import { useParams } from "react-router-dom";
import { ProfileUser } from "../../components";
import { Navbar } from "../../layout";
import "./profile.css";
export const Profile = () => {
  const params = useParams();
  const user = params.id ? { ...params } : { id: "me" };
  return (
    <div className="Profile">
      <Navbar />
      <ProfileUser user={user} />
    </div>
  );
};
