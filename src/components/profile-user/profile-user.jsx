import { useEffect, useState } from "react";
import { ProfileUserInfo } from "../../layout";
import { axiosInstance } from "../../services";
import "./profile-user.css";
import { LogOut } from "../../shared/logout/logout";
export const ProfileUser = ({ user }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/users/${user.id}`)
      .then((data) => {
        return setData(data.data.data);
      })
      .catch((err) => {
        if (err.response.status == 401) {
          LogOut();
        }
      });
  }, [user]);

  return (
    <div className="ProfileUser">
      <ProfileUserInfo data={data} user={user.id} />
    </div>
  );
};
