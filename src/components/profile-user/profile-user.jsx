import { useEffect, useState } from "react";
import { ProfileUserInfo } from "../../layout";
import { axiosInstance } from "../../services";
import "./profile-user.css";
export const ProfileUser = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/users/me")
      .then((data) => {
        console.log(data.data.data);
        return setData(data.data.data)
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="ProfileUser">
      <ProfileUserInfo data={data} />
    </div>
  );
};
