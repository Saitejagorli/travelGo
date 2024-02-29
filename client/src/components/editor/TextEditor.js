import React, { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";

import { useAuth, backendUrl } from "../auth/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";

import "react-quill/dist/quill.snow.css";
import styles from "./post.module.css";
import upload from "../../assets/images/upload.png";

const TextEditor = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const handleContent = (html) => {
    setContent(html);
  };
  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote"],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      ["link"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["clean"],
    ],
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (title.length < 10) {
      setErrorMessage("* title must contain atleast 10 characters");
      return;
    }
    const contentLength = new DOMParser().parseFromString(content, "text/html")
      .body.textContent.length;
    if (contentLength < 300) {
      setErrorMessage("* content must contain atleast 300 characters");
      return;
    }
    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("content", content);
      if (image) {
        formData.append("image", image);
      }
      const response = await axios.post(
        `${backendUrl}/blogs/create-blog-post`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        navigate(`/users/${user._id}`);
      } else {
        alert("Error creating blog post:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating blog post:", error.message);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <div className={styles.container}>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label htmlFor="image">Image:</label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <br />
              {image ? (
                <div>
                  <img src={image} alt="Preview" className={styles.image} />
                </div>
              ) : (
                <img className={styles.image} src={upload} alt="img" />
              )}
              <input
                type="file"
                accept="image/*"
                id="image"
                onChange={handleImageUpload}
                className={styles.imageInput}
                required
              />
            </div>
            <br />
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              onChange={handleTitle}
              className={styles.title}
              required
            />
            <label htmlFor="content">Content:</label>
            <div className={styles.quillContainer}>
              <ReactQuill
                theme="snow"
                modules={modules}
                onChange={handleContent}
                value={content}
                placeholder="write something..."
                required
              />
            </div>
            <p className={styles.error}>{errorMessage}</p>
            <button type="submit" className={styles.submitButton}>
              submit
            </button>
          </form>
        </div>
      ) : (
        <Navigate to="/auth/login" />
      )}
    </>
  );
};

export default TextEditor;
