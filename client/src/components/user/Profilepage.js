import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { useAuth, backendUrl } from "../auth/AuthContext";
import spinner from "../../assets/images/spinner.gif";

import styles from "./profileStyles.module.css";
import profile from "../../assets/images/user-profile.jpg";

import { MdLocationPin } from "react-icons/md";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState(userData.image || "");
  const [fullName, setFullName] = useState(userData.fullName || "");
  const [location, setLocation] = useState(userData.location || "");
  const [bio, setBio] = useState(userData.bio || "");

  const userId = useParams().userId;
  const getImageAsBase64 = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const base64String = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });

      return base64String;
    } catch (error) {
      console.error("Error fetching or converting image to base64:", error);
      throw error;
    }
  };
  useEffect(() => {
    setLoading(true);
    const getUserInfo = async () => {
      try {
        const response = await fetch(`${backendUrl}/users/${userId}`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          if (user._id == data._id) {
            setUser(data);
          }
          setUserData(data);
          setPosts(data.blogPosts);
          setImage(
            data.profilePhoto
              ? await getImageAsBase64(`${backendUrl}${data.profilePhoto}`)
              : ""
          );
          setFullName(data.fullName || "");
          setLocation(data.location || "");
          setBio(data.bio || "");
          setLoading(false);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getUserInfo();
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [edit, userId]);

  const onDelete = async (id) => {
    var userChoice = window.confirm("Do you want to delete the post?");
    if (userChoice) {
      try {
        const response = await fetch(`${backendUrl}/blogs/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (response.ok) {
          setPosts(posts.filter((post) => post._id !== id));
        } else if (response.status === 404) {
          alert("Post not found. It may have already been deleted.");
        } else {
          alert(
            `Error occurred while deleting the post. Status: ${response.status}`
          );
        }
      } catch (error) {
        console.log("Error occured while deleting the post", error);
        alert("An unexpected error occurred. Please try again later.");
      }
    }
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

  const handleFullName = (e) => {
    setFullName(e.target.value);
  };
  const handleLocation = (e) => {
    setLocation(e.target.value);
  };
  const handleBio = (e) => {
    setBio(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("location", location);
      formData.append("bio", bio);
      formData.append("profilePhoto", image);

      const response = await axios.post(
        `${backendUrl}/users/update/${userId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        setEdit(false);
      } else {
        console.error(
          "Error while updating the user data:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error updating the user:", error.message);
    }
  };
  return (
    <>
      {userData && (
        <>
          {edit ? (
            <button className={styles.editBtn} onClick={() => setEdit(false)}>
              cancel
            </button>
          ) : (
            userId === user._id && (
              <button className={styles.editBtn} onClick={() => setEdit(true)}>
                edit
              </button>
            )
          )}
          <div className={styles.container}>
            {edit ? (
              <div>
                <form onSubmit={handleSubmit}>
                  <div className={styles.profileContainer}>
                    <div>
                      <label htmlFor="profilePhoto">Image:</label>
                      <br />
                      <img src={image ? image : profile} alt="profilePhoto" />
                      <br />
                      <input
                        type="file"
                        id="profilePhoto"
                        accept="image/*"
                        onChange={handleImageUpload}
                        required
                      />
                    </div>
                    <br />
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={fullName}
                      onChange={handleFullName}
                      className={styles.inputField}
                      placeholder="full name"
                      required
                    />
                    <br />
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={location}
                      onChange={handleLocation}
                      placeholder="location"
                      className={styles.inputField}
                      required
                    />
                    <br />
                    <textarea
                      id="bio"
                      name="bio"
                      value={bio}
                      onChange={handleBio}
                      placeholder="bio"
                      className={styles.inputField}
                      required
                    ></textarea>
                    <br />
                    <button type="submit" className={styles.update}>
                      Update Profile
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <>
                <div className={styles.profileContainer}>
                  <img
                    src={
                      userData.profilePhoto
                        ? `${backendUrl}${userData.profilePhoto}`
                        : profile
                    }
                    alt="profilePhoto"
                  />
                  <h3>
                    {userData.fullName ? userData.fullName : "Your FullName"}
                  </h3>
                  <p>
                    <MdLocationPin size="1.2em" color="#11999E" />
                    &nbsp;{userData.location ? userData.location : "Earth🌍"}
                  </p>
                  <p>
                    {userData.bio
                      ? userData.bio
                      : "Your profile is looking a bit empty! Add a bio and more details to let others know about you."}
                  </p>
                </div>
              </>
            )}

            <>
              <div className={styles.heading}>Posts</div>
              {loading && (
                <div className={styles.loader}>
                  <img src={spinner} alt="loader" />
                </div>
              )}
              {posts.length === 0 ? (
                <h3 style={{ textAlign: "center" }}>No posts yet!</h3>
              ) : (
                posts.map((post) => {
                  return (
                    <div className={styles.postContainer}>
                      <div key={post._id} className={styles.card}>
                        <img
                          src={`${backendUrl}${post.image}`}
                          height="180"
                          width="180"
                          alt="img"
                        />
                        <div className={styles.content}>
                          <h3>{post.title}</h3>
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                post.content &&
                                post.content.slice(
                                  0,
                                  screenWidth > 900 ? 200 : 50
                                ) +
                                  '... <span style="color: blue; cursor: pointer;">Read More</span>',
                            }}
                          />
                          <p className={styles.tag}>
                            {post.author}
                            <br />
                            {new Date(post.date).toISOString().split("T")[0]}
                          </p>
                        </div>
                      </div>
                      <div className={styles.btnContainer}>
                        <button
                          className={styles.postBtn}
                          onClick={() => navigate(`/blogs/${post._id}`)}
                        >
                          view
                        </button>
                        {userData._id === user._id && (
                          <button
                            className={styles.postBtn}
                            onClick={() => onDelete(post._id)}
                          >
                            delete
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </>
          </div>
        </>
      )}
    </>
  );
};

export { Profile };
