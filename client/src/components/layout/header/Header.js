import { Link } from "react-router-dom";

import SearchComponent from "./SearchComponent";
import Menu from "./Menu";

import "../styles.css";

const Header = () => {
  return (
    <>
      <nav className="navbar">
        <Link className="logo" to="/">
          travelGo
        </Link>
        <SearchComponent />
        <Menu />
      </nav>
    </>
  );
};

export default Header;
