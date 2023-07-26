// import { useEffect, useState, useRef } from "react";
// import { api } from "../../shared/url";
// import "./posts.css";
// import { axiosInstance } from "../../services";
// export const Posts = () => {
//   const myRef = useRef();
//   const [data_posts, setData_posts] = useState([]);
//   const [offset, setOffset] = useState(0);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axiosInstance.get(`/posts?limit=4&offset=${offset}`);
//         const data = await res.data.data;

//         console.log(data);
//         setData_posts((pre) => [...pre, ...data]);
//       } catch (error) {
//         console.log(error);
//       }
//       console.log("fetch1");
//     };

//     fetchData();
//   }, [offset]);

//   useEffect(() => {
//     const handleScroll = (e) => {
//       const scrollHeight = e.target.documentElement.scrollHeight;
//       const currentHeight =
//         e.target.documentElement.scrollTop + window.innerHeight;

//       if (currentHeight + 1 >= scrollHeight) {
//         setOffset(offset + 4);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [offset]);

//   return (
//     <div className="Posts__mini" ref={myRef}>
//       {data_posts.map((post) => (
//         <div className="Posts__mini__post" key={post._id}>
//           <div className="img_content">
//             <img
//               src={`${api}files/post/${post.image}`}
//               alt=""
//               className="Posts__mini__image"
//             />
//           </div>
//           <div className="post__mini_options">
//             <i className="fa-regular fa-heart icon"></i>
//             <i className="fa-solid fa-share-nodes icon"></i>
//             <i className="fa-solid fa-link icon"></i>
//           </div>
//           <p className="posts__mini__likecount">LIKE: {post.like}</p>
//           <h3 className="Posts__mini__title">
//             <span>{post.user_id.username}</span> {post.title}
//           </h3>
//           <p className="Posts__mini__desc">{post.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

import { useEffect, useState, useRef } from "react";
import { api } from "../../shared/url";
import "./posts.css";
import "./loader.css";
import { axiosInstance } from "../../services";
import InfiniteScroll from "react-infinite-scroll-component";
export const Posts = () => {
  const [data_posts, setData_posts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/posts?limit=2&offset=${offset}`);
        const data = await res.data.data;
        setData_posts((pre) => [...pre, ...data]);
        if (data.length == 0) {
          console.log("ok");
          setHasMore(false);
        }
        // console.log(data.length);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [offset]);

  const fetchMoreData = () => {
    setTimeout(() => {
      setOffset((pre) => pre + 2);
    }, 700);
  };

  return (
    <div className="Posts__mini">
      <InfiniteScroll
        dataLength={data_posts.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        }
      >
        {data_posts.map((post) => (
          <div className="Posts__mini__post" key={post._id}>
            <div className="Posts__mini__profile">
              <h2>
                {post.user_id.first_name} {post.user_id.last_name}{" "}
                {post.user_id.haveStar ? (
                  <i className="fa-solid fa-star"></i>
                ) : null}
              </h2>
              <p>
                {new Date(post.created_at).toDateString()}{" "}
                {new Date(post.created_at).toTimeString().substring(0, 9)}
              </p>
            </div>
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
      </InfiniteScroll>
    </div>
  );
};
