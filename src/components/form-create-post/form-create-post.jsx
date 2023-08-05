import "./form-create-post.css";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
export const FormCreatePost = () => {
  return (
    <div className="FormCreatePost">
      <form className="FormCreatePost__form">
        <h3 className="FormCreatePost__title">CREATE POST</h3>
        <h3 className="FormCreatePost__description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum,
          similique.
        </h3>
        <input
          type="text"
          className="FormCreatePost__main-style FormCreatePost__simple-input"
        />
        <input
          type="url"
          className="FormCreatePost__main-style FormCreatePost__simple-input"
        />
        <input
          type="file"
          className="FormCreatePost__main-style FormCreatePost__file-input"
          accept="image/*"
          id="inputField"
        />
        <textarea className="FormCreatePost__main-style FormCreatePost__textarea"></textarea>
        <label htmlFor="inputField" className="FormCreatePost__file-label">
          <MdOutlineAddPhotoAlternate className="FormCreatePost__file-label-icon" /> Choose a Photo
        </label>
        <button className="FormCreatePost__button">Submit</button>
      </form>
    </div>
  );
};
