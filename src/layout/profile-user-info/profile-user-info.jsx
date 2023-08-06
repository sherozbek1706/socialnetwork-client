import "./profile-user-info.css";
export const ProfileUserInfo = ({ data }) => {
  return (
    <div className="ProfileUserInfo">
      <h1 className="ProfileUserInfo__title">
        Profile <span>#{data.username}</span>
      </h1>
      
      <p className="ProfileUserInfo__fullname">
        {data.first_name} {data.last_name}
      </p>
    </div>
  );
};
