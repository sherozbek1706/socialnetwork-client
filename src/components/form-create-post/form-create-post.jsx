import { useRef } from "react";
import "./form-create-post.css";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../services";
import { successNotify, errorNotify } from "../../shared/toastify";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { LogOut } from "../../shared/logout/logout";
export const FormCreatePost = () => {
  const navigate = useNavigate();
  const titleRef = useRef();
  const webRef = useRef();
  const fileRef = useRef();
  const descriptionRef = useRef();

  const handleChangeFileInput = () => {
    let doc = document.querySelector(".FormCreatePost__file-label");
    if (fileRef.current.files[0]) {
      doc.classList.add("filltheimage");
      doc.textContent = fileRef.current.files[0].name;
    } else {
      doc.classList.remove("filltheimage");
      doc.innerHTML = `<MdOutlineAddPhotoAlternate className="FormCreatePost__file-label-icon" />
      Choose a Photo`;
    }
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const formButton = document.querySelector(".FormCreatePost__button");

    if (!fileRef.current.files[0]) {
      errorNotify("You must choose a Photo");
      return;
    }

    formButton.disabled = true;

    formData.append("image", fileRef.current.files[0]);
    formData.append("title", titleRef.current.value);
    formData.append("web_link", webRef.current.value);
    formData.append("description", descriptionRef.current.value);

    axiosInstance
      .post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((data) => {
        successNotify("Created Post!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        if (err.response.status == 401) {
          LogOut();
        }
      });
  };

  return (
    <div className="FormCreatePost">
      <form className="FormCreatePost__form" onSubmit={handleCreatePost}>
        <h3 className="FormCreatePost__title">CREATE POST</h3>
        <h3 className="FormCreatePost__description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum,
          similique.
        </h3>
        <input
          type="text"
          ref={titleRef}
          placeholder="Fill in the Title"
          className="FormCreatePost__main-style FormCreatePost__simple-input"
          required
        />
        <input
          type="url"
          ref={webRef}
          placeholder="Fill in the Link"
          className="FormCreatePost__main-style FormCreatePost__simple-input"
          required
        />
        <input
          type="file"
          ref={fileRef}
          className="FormCreatePost__main-style FormCreatePost__file-input"
          name="image"
          placeholder="Fill in the Photo"
          accept="image/*"
          onChange={handleChangeFileInput}
          id="inputField"
        />
        <textarea
          className="FormCreatePost__main-style FormCreatePost__textarea"
          ref={descriptionRef}
          placeholder="Fill in the Description"
          maxLength={400}
          required
        ></textarea>
        <label htmlFor="inputField" className="FormCreatePost__file-label">
          <MdOutlineAddPhotoAlternate className="FormCreatePost__file-label-icon" />{" "}
          Choose a Photo
        </label>
        <button className="FormCreatePost__button">Submit</button>
      </form>
    </div>
  );
};
