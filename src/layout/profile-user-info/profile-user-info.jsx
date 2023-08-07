import "./profile-user-info.css";
import { api } from "../../shared/url.js";
import { BiEdit } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
export const ProfileUserInfo = ({ data, user }) => {
  return (
    <div className="ProfileUserInfo">
      <h1 className="ProfileUserInfo__title">
        Profile <span>#{data.username}</span>
      </h1>
      <div className="ProfileUserInfo__user">
        <div className="ProfileUserInfo__imgcontent">
          <img
            className="ProfileUserInfo__photo"
            src={`${api}${data.image}`}
            alt=""
          />
        </div>
        <div className="ProfileUserInfo__userinfo">
          <p className="ProfileUserInfo__fullname">
            {data.first_name} {data.last_name}
          </p>
          <p className="ProfileUserInfo__email">{data.email}</p>
          <div className="ProfileUserInfo__options">
            {user == "me" ? (
              <>
                <button className="ProfileUserInfo__select">
                  <BiEdit className="ProfileUserInfo__selecticon" /> EDIT
                  ACCOUNT
                </button>
                {data.haveStar ? (
                  <button className="ProfileUserInfo__select active__star">
                    <FaStar className="ProfileUserInfo__selecticon" /> HAVE STAR
                  </button>
                ) : (
                  <button className="ProfileUserInfo__select">
                    <FaStar className="ProfileUserInfo__selecticon" /> GET STAR
                  </button>
                )}
              </>
            ) : (
              <>
                {/* <button className="ProfileUserInfo__select">
                  <BiEdit className="ProfileUserInfo__selecticon" /> EDIT
                  ACCOUNT
                </button> */}
                {data.haveStar ? (
                  <button className="ProfileUserInfo__select active__star">
                    <FaStar className="ProfileUserInfo__selecticon " />{" "}
                    HAVE STAR
                  </button>
                ) : (
                  <button className="ProfileUserInfo__select">
                    <FaStar className="ProfileUserInfo__selecticon" /> GET STAR
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
