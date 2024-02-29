import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

import styles from "./homeStyles.module.css";

const TagLine = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const routeChange = () => {
    if (isAuthenticated) {
      navigate("/blogs/create-blog-post");
    } else {
      navigate("/auth/login");
    }
  };
  return (
    <div className={styles.tagContainer}>
      <h1 className={styles.tagline}>
        <span className={styles.highlight}>Journey</span> Beyond Boundaries
        Explore,
        <br /> capture , connect
      </h1>
      <div className={styles.rightContainer}>
        <button className={styles.button} onClick={() => routeChange()}>
          Start Writing →
        </button>
      </div>
    </div>
  );
};

export default TagLine;
