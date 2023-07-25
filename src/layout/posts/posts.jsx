import "./posts.css";
import { Posts as MiniPost } from "../../components/";
import { useEffect, useState } from "react";
export const Posts = () => {
  useEffect(() => {}, []);
  return (
    <div className="Posts">
      <MiniPost />
    </div>
  );
};
