import { useEffect, useState } from "react";
import { ProfileUserInfo } from "../../layout";
import { axiosInstance } from "../../services";
import "./profile-user.css";
export const ProfileUser = ({ user }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/users/${user.id}`)
      .then((data) => {
        return setData(data.data.data);
      })
      .catch((err) => console.log(err));
  }, [user]);

  return (
    <div className="ProfileUser">
      <ProfileUserInfo data={data} user={user.id} />
    </div>
  );
};
