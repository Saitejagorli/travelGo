import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../../auth/AuthContext";

import { IoSearch } from "react-icons/io5";
import { GoSearch } from "react-icons/go";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await fetch(`${backendUrl}/blogs/titles`);
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error("Failed to fetch post titles");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchTitles();
  }, []);
  const handleChange = (e) => {
    const inputValue = e.target.value;
    setSearchQuery(inputValue);
    const filtered = inputValue
      ? posts.filter((post) =>
          post.title.toLowerCase().includes(inputValue.toLowerCase())
        )
      : [];
    setFilteredPosts(filtered.slice(0, 8));
  };
  const handleClick = (post) => {
    navigate(`/blogs/${post._id}`);
    setSearchQuery("");
    setFilteredPosts([]);
  };
  // const handleSearch = () => {
  //   setFilteredPosts(posts.filter((post)=>(
  //     post.title.toLowerCase().includes(searchQuery.toLowerCase())
  //   )))
  //   console.log(filteredPosts);
  // };
  return (
    <div>
      <div className="search-component">
        <input
          type="text"
          placeholder="search..."
          value={searchQuery}
          onChange={handleChange}
          className="search-input"
        />
        {/* // onClick={handleSearch} */}
        <div className="search-icon">
          <IoSearch size="1.3em" color="#fff" />
        </div>
      </div>
      <div className="search-list-item-container">
        <ul>
          {filteredPosts.map((post) => (
            <div
              className="search-list-item"
              key={post._id}
              onClick={() => handleClick(post)}
            >
              <div>
                <GoSearch size="1.2em" />
              </div>
              &nbsp;
              <li>{post.title}</li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchComponent;
