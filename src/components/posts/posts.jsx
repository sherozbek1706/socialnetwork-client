import { useEffect, useState, useRef } from "react";
import { api } from "../../shared/url";
import "./posts.css";
import { axiosInstance } from "../../services";
export const Posts = () => {
  const myRef = useRef();
  const [data_posts, setData_posts] = useState([]);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      axiosInstance.get(`/posts?limit=5&offset=${offset}`).then((res) => {
        setData_posts((pre) => [...pre, ...res.data.data]);
        console.log(res.data.data);
      });
    };

    fetchData();
  }, [offset]);

  useEffect(() => {
    const handleScroll = (e) => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight =
        e.target.documentElement.scrollTop + window.innerHeight;

      if (currentHeight + 20 >= scrollHeight) {
        setOffset(offset + 5);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="Posts__mini" ref={myRef}>
      {data_posts.map((post) => (
        <div className="Posts__mini__post" key={post._id}>
          <div className="img_content">
            <img
              src={`${api}files/post/${post.image}`}
              alt=""
              className="Posts__mini__image"
            />
          </div>
          <div className="post__mini_options">
            <i className="fa-regular fa-heart icon"></i>
            <i className="fa-solid fa-share-nodes icon"></i>
            <i className="fa-solid fa-link icon"></i>
          </div>
          <p className="posts__mini__likecount">LIKE: {post.like}</p>
          <h3 className="Posts__mini__title">
            <span>{post.user_id.username}</span> {post.title}
          </h3>
          <p className="Posts__mini__desc">{post.description}</p>
        </div>
      ))}
    </div>
  );
};
