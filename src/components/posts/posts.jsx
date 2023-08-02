import { useEffect, useState } from "react";
import { api } from "../../shared/url";
import "./posts.css";
import "./loader.css";
import { axiosInstance } from "../../services";
import { AiOutlineLink, AiOutlineShareAlt } from "react-icons/ai";
import { BiLike, BiSolidLike } from "react-icons/bi";

import image1 from "../../../public/ghost_icon/1.jpg";
import { errorNotify } from "../../shared/toastify";

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
          res = await axiosInstance.get(`/posts?limit=5&offset=${offset}`);
          data = await res.data.data;
          setData_posts((pre) => [...pre, ...data]);
          setMode(false);
          if (data.length == 0) {
            setHasMore(false);
          }
        } else {
          res = await axiosInstance.get(`/posts?limit=${5 + offset}`);
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
      }
    });

    setLikeAction((pre) => !pre);
  };

  const handleChangeLike = (post, postId) => {
    let like = post.likedUsers.includes(user_id);

    if (like) {
      return (
        <BiSolidLike
          className="icon icon-like"
          onClick={() => handleLikePost(postId)}
        />
      );
    } else {
      return (
        <BiLike
          className="icon icon-like"
          onClick={() => handleLikePost(postId)}
        />
      );
    }
  };

  const handleChangeLimit = () => {
    setMode(true);
    setOffset((pre) => pre + 5);
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
          <div className="Posts__mini__profile">
            <img src={image1} className="Posts__mini__primages" alt="" />
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
          <div className="img_content">
            <img
              src={`${api}files/post/${post.image}`}
              alt=""
              className="Posts__mini__image"
            />
          </div>
          <div className="post__mini_options">
            {handleChangeLike(post, post._id)}
            <AiOutlineShareAlt className="icon" />
            <a target="_blank" href={post.web_link}>
              <AiOutlineLink className="icon" />
            </a>
          </div>
          <p className="posts__mini__likecount">{post.like} Like</p>
          <h3 className="Posts__mini__title">
            <span>{post.user_id.username}</span> {post.title}
          </h3>
          <p className="Posts__mini__desc">{post.description}</p>
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
