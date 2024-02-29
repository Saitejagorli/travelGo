import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../auth/AuthContext";

import styles from "./homeStyles.module.css";
import spinner from "../../assets/images/spinner.gif";

const TrendingPosts = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const routeChange = (id) => {
    navigate(`blogs/trendingblogs/${id}`);
  };
  useEffect(() => {
    setLoading(true);
    const fetchTrendingPosts = async () => {
      try {
        const response = await fetch(`${backendUrl}/blogs/trendingposts`);
        if (response.ok) {
          const data = await response.json();
          setTrendingPosts(data);
          setLoading(false);
        } else {
          console.error("Failed to fetch featured posts");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchTrendingPosts();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Trending</div>
      {loading && (
        <div className={styles.loader}>
          <img src={spinner} alt="loader" />
        </div>
      )}
      {trendingPosts[0] && (
        <>
          <div className={styles.trending}>
            {trendingPosts.slice(0, 2).map((post) => {
              return (
                <div
                  className={styles.trendingLeft}
                  key={post._id}
                  onClick={() => routeChange(post._id)}
                >
                  <img src={`${backendUrl}${post.image}`} alt="img" />
                  <h3>{post.title}</h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        post.content.slice(0, 100) +
                        '... <span style="color: blue; cursor: pointer;">Read More</span>',
                    }}
                  />
                  <p className={styles.tag}>
                    {post.author}
                    <br />
                    {new Date(post.date).toISOString().split("T")[0]}
                  </p>
                </div>
              );
            })}
          </div>
          <div className={styles.trendingBottom}>
            {trendingPosts.slice(2).map((post) => {
              return (
                <div
                  className={styles.trendingCard}
                  key={post._id}
                  onClick={() => routeChange(post._id)}
                >
                  <img src={`${backendUrl}${post.image}`} alt="img" />

                  <div className={styles.trendingContent}>
                    <h4>{post.title}</h4>
                    <div
                      className={styles.truncatedContent}
                      dangerouslySetInnerHTML={{
                        __html:
                          post.content.slice(0, 50) +
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

export default TrendingPosts;
