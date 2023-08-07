import { useEffect, useState } from "react";
import { api } from "../../shared/url";
import "./posts.css";
import "./loader.css";
import { axiosInstance } from "../../services";
import { AiOutlineLink, AiOutlineShareAlt } from "react-icons/ai";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { Link } from "react-router-dom";
import { errorNotify } from "../../shared/toastify";
import { LogOut } from "../../shared/logout/logout";

export const Posts = () => {
  const [data_posts, setData_posts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [mode, setMode] = useState(false);
  const [likeAction, setLikeAction] = useState(false);
  const user_id = localStorage.getItem("user_id") || false;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res;
        let data;
        if (mode) {
          res = await axiosInstance.get(`/posts?limit=10&offset=${offset}`);
          data = await res.data.data;
          setData_posts((pre) => [...pre, ...data]);
          setMode(false);
          if (data.length == 0) {
            setHasMore(false);
          }
        } else {
          res = await axiosInstance.get(`/posts?limit=${10 + offset}`);
          data = await res.data.data;
          setData_posts(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [offset, likeAction]);

  const handleLikePost = async (id) => {
    await axiosInstance.put(`/users/like/posts/${id}`).catch((error) => {
      console.log(error.response);
      if (error.response.data.error == "Unauthorized.") {
        errorNotify("You should login!");
      } else if (error.response.data.error == "jwt expired") {
        errorNotify("You must login again!");
        if (error.response.status == 401) {
          LogOut();
        }
      }
    });

    setLikeAction((pre) => !pre);
  };

  const handleChangeLike = (post, postId) => {
    let like = post.likedUsers.includes(user_id);

    if (like) {
      return (
        <>
          <BiSolidLike
            className="icon icon-like"
            onClick={() => handleLikePost(postId)}
          />
          <p className="statics__count">{post.like}</p>
        </>
      );
    } else {
      return (
        <>
          <BiLike
            className="icon icon-like"
            onClick={() => handleLikePost(postId)}
          />
          <p className="statics__count">{post.like}</p>
        </>
      );
    }
  };

  const handleChangeLimit = () => {
    setMode(true);
    setOffset((pre) => pre + 10);
  };

  if (!data_posts.length)
    return (
      <div className="container__spinner">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );

  return (
    <div className="Posts__mini">
      {data_posts.map((post) => (
        <div className="Posts__mini__post" key={post._id}>
          <Link
            to={`/profile/${post.user_id._id}`}
            className="Posts__mini__post__profile__link"
          >
            <div className="Posts__mini__profile">
              <div className="Posts__mini__profile__content">
                <img
                  src={`${api}${post.user_id.image}`}
                  className="Posts__mini__primages"
                  alt=""
                />
              </div>
              <div className="Posts__mini__linkusername">
                <h2>
                  {post.user_id.first_name} {post.user_id.last_name}
                  {post.user_id.haveStar ? (
                    <i className="fa-solid fa-star"></i>
                  ) : null}
                </h2>
                <p>
                  {new Date(post.created_at).toDateString()}{" "}
                  {new Date(post.created_at).toTimeString().substring(0, 9)}
                </p>
              </div>
            </div>
          </Link>
          <div className="img_content">
            <img
              src={`${api}${post.image}`}
              alt=""
              className="Posts__mini__image"
            />
          </div>
          <div className="Posts__mini__tools">
            <div className="post__mini_options">
              {handleChangeLike(post, post._id)}
              <AiOutlineShareAlt className="icon" />
              <a className="dontneedhref" target="_blank" href={post.web_link}>
                <AiOutlineLink className="icon" />
              </a>
            </div>
            <p className="posts__mini__likecount">{post.view || 0} views</p>
            <h3 className="Posts__mini__title">
              <Link
                to={`/profile/${post.user_id._id}`}
                className="Posts__mini__post__profile__link"
              >
                <span>{post.user_id.username}</span>
              </Link>{" "}
              {post.title}
            </h3>
            <p className="Posts__mini__desc">
              {post.description.length > 130
                ? `${post.description.substring(0, 130)} ...`
                : post.description}{" "}
            </p>
          </div>
        </div>
      ))}
      {hasMore ? (
        <button className="post__hasMore" onClick={handleChangeLimit}>
          ADD MORE
        </button>
      ) : null}
    </div>
  );
};
