import { FormCreatePost } from "../../components";
import { Navbar } from "../../layout";
import "./create-post.css";
export const CreatePost = () => {
  return (
    <div className="CreatePost">
      <Navbar />
      <FormCreatePost />
    </div>
  );
};
