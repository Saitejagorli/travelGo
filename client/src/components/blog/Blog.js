import styles from "./blogStyles.module.css";
import { backendUrl } from "../auth/AuthContext";

const Blog = ({ post }) => {
  return (
    <div className={styles.container}>
      {Object.keys(post).length !== 0 && (
        <>
          <img
            className={styles.postImg}
            src={`${backendUrl}${post.image}`}
            alt="img"
          />
          <div className={styles.body}>
            <h1 className={styles.heading}>{post.title}</h1>
            <div
              dangerouslySetInnerHTML={{
                __html: post.content,
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default Blog;
