import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { backendUrl } from "../auth/AuthContext";

import styles from "./blogStyles.module.css";
import Blog from "./Blog";
import spinner from "../../assets/images/spinner.gif";
import PageNotFound from "../layout/PageNotFound";

const BlogSection = () => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const section = useParams().section;
  const id = useParams().postId;
  useEffect(() => {
    setLoading(true);
    const fetchPost = async () => {
      try {
        const response = await fetch(`${backendUrl}/blogs/${section}/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
          setLoading(false);
          console.log(post);
        } else {
          console.error("Failed to fetch featured posts");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchPost();
  }, [id]);
  return (
    <div className={styles.container}>
      {loading && (
        <div className={styles.loader}>
          <img src={spinner} alt="loader" />
        </div>
      )}
      {Object.keys(post).length !== 0 && <Blog post={post} />}
    </div>
  );
};
const NormalBlog = () => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const id = useParams().postId;
  useEffect(() => {
    setLoading(true);
    const fetchPost = async () => {
      try {
        const response = await fetch(`${backendUrl}/blogs/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
          setLoading(false);
        } else {
          console.error("Failed to fetch featured posts");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchPost();
  }, [id]);
  return (
    <div className={styles.container}>
      {loading && (
        <div className={styles.loader}>
          <img src={spinner} alt="loader" />
        </div>
      )}
      {Object.keys(post).length !== 0 ? <Blog post={post} /> : <PageNotFound />}
    </div>
  );
};

export { BlogSection, NormalBlog };
