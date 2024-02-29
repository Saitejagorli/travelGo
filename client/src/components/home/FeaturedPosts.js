import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../auth/AuthContext";

import styles from "./homeStyles.module.css";
import spinner from "../../assets/images/spinner.gif";

const FeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    const fetchFeaturedPosts = async () => {
      try {
        const response = await fetch(`${backendUrl}/blogs/featuredposts`);
        if (response.ok) {
          const data = await response.json();
          setFeaturedPosts(data);
          setLoading(false);
        } else {
          console.error("Failed to fetch featured posts");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchFeaturedPosts();
  }, []);
  const routeChange = (id) => {
    navigate(`blogs/featuredblogs/${id}`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.heading}>Featured</div>
      {loading && (
        <div className={styles.loader}>
          <img src={spinner} alt="loader" />
        </div>
      )}
      {featuredPosts[0] && (
        <>
          <div
            className={styles.featured}
            onClick={() => routeChange(featuredPosts[0]._id)}
          >
            <div className={styles.featuredLeft}>
              <h1>{featuredPosts[0].title}</h1>
              <div
                className={styles.truncatedContent}
                dangerouslySetInnerHTML={{
                  __html:
                    featuredPosts[0].content.slice(0, 300) +
                    '... <span style="color: blue; cursor: pointer;">Read More</span>',
                }}
              />
              <p className={styles.tag}>
                {featuredPosts[0].author}
                <br />
                {new Date(featuredPosts[0].date).toISOString().split("T")[0]}
              </p>
            </div>
            <div className={styles.featuredRight}>
              <div className={styles.topImage}>
                <img src={`${backendUrl}${featuredPosts[0].image}`} alt="img" />
              </div>
              <div className={styles.bottomImage}>
                <img src={`${backendUrl}/images/bali.jpg`} alt="img" />
              </div>
            </div>
          </div>
          <div className={styles.featuredBottom}>
            {featuredPosts.slice(1).map((post) => {
              return (
                <div key={post._id} onClick={() => routeChange(post._id)}>
                  <img src={`${backendUrl}${post.image}`} alt="img" />
                  <div className={styles.content}>
                    <h3>{post.title}</h3>
                    <div
                      className={styles.truncatedContent}
                      dangerouslySetInnerHTML={{
                        __html:
                          post.content.slice(0, 110) +
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
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default FeaturedPosts;
