import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../auth/AuthContext";

import styles from "./homeStyles.module.css";
import spinner from "../../assets/images/spinner.gif";

const RecentPosts = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const routeChange = (id) => {
    navigate(`blogs/${id}`);
  };
  useEffect(() => {
    setLoading(true);
    const fetchRecentPosts = async () => {
      try {
        const response = await fetch(`${backendUrl}/blogs/recentblogs`);
        if (response.ok) {
          const data = await response.json();
          setRecentPosts(data);
          setLoading(false);
        } else {
          console.error("Failed to fetch featured posts");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchRecentPosts();
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.heading}>Recent</div>
      {loading && (
        <div className={styles.loader}>
          <img src={spinner} alt="loader" />
        </div>
      )}
      <div className={styles.recent}>
        {Object.keys(recentPosts).length !== 0 && (
          <>
            <div className={styles.recentLeft}>
              <div onClick={() => routeChange(recentPosts[0]._id)}>
                <img
                  className={styles.recentImg}
                  src={`${backendUrl}${recentPosts[0].image}`}
                  alt="img"
                />
                <div>
                  <h3>{recentPosts[0].title}</h3>
                  <div
                    className={styles.truncatedContent}
                    dangerouslySetInnerHTML={{
                      __html:
                        recentPosts[0].content.slice(0, 400) +
                        '... <span style="color: blue; cursor: pointer;">Read More</span>',
                    }}
                  />
                  <p className={styles.tag}>
                    {recentPosts[0].author}&nbsp;&nbsp;
                    {new Date(recentPosts[0].date).toISOString().split("T")[0]}
                  </p>
                </div>
              </div>
              <div>
                {
                  <div
                    key={recentPosts[1]._id}
                    className={styles.recentRight}
                    onClick={() => routeChange(recentPosts[1]._id)}
                  >
                    <img
                      className={styles.smallImage}
                      src={`${backendUrl}${recentPosts[1].image}`}
                      alt=""
                    />
                    <div className={styles.content}>
                      <h3>{recentPosts[1].title}</h3>
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            recentPosts[1].content.slice(0, 100) +
                            '... <span style="color: blue; cursor: pointer;">Read More</span>',
                        }}
                      />
                      <p className={styles.tag}>
                        {recentPosts[1].author}&nbsp;&nbsp;
                        {
                          new Date(recentPosts[1].date)
                            .toISOString()
                            .split("T")[0]
                        }
                      </p>
                    </div>
                  </div>
                }
              </div>
            </div>
            <div className={styles.recentR}>
              {recentPosts.slice(screenWidth > 900 ? 2 : 0).map((post) => {
                return (
                  <div
                    key={post._id}
                    className={styles.recentRight}
                    onClick={() => routeChange(post._id)}
                  >
                    <img
                      className={styles.smallImage}
                      src={`${backendUrl}${post.image}`}
                      alt=""
                    />
                    <div className={styles.content}>
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
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default RecentPosts;
